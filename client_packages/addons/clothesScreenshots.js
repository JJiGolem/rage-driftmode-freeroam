const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const player = mp.players.local;

const openMenuKey = 0x4C; // L

const clotheComponent = (id, name, cameraSettings, hideHead = true) => ({ id, name, cameraSettings, hideHead });
const cameraSettings = (height, headingOffset, fov, distance) => ({ height, headingOffset, fov, distance });

const clothesComponents = [
    clotheComponent(1, "Masks", cameraSettings(0.65, 25, 40, 0.7)),
    clotheComponent(2, "Hair Styles", cameraSettings(0.8, 30, 40, 0.72), false),
    clotheComponent(3, "Torsos", cameraSettings(0, 0, 40, 1.2)),
    clotheComponent(4, "Legs", cameraSettings(-0.25, 25, 40, 2.5)),
    clotheComponent(5, "Bags and Parachutes", cameraSettings(0.3, 150, 40, 1.4)),
    clotheComponent(6, "Shoes", cameraSettings(-0.85, 40, 40, 0.75)),
    clotheComponent(7, "Accessories", cameraSettings(0.5, 0, 40, 0.7), false),
    clotheComponent(8, "Undershirts", cameraSettings(0.1, 0, 40, 1.2)),
    clotheComponent(9, "Body Armors", cameraSettings(0.1, 10, 40, 1.2)),
    clotheComponent(10, "Decals", cameraSettings(0.65, 180, 40, 0.7)),
    clotheComponent(11, "Tops", cameraSettings(0.1, 0, 40, 1.2)),
];

const propsComponents = [
    clotheComponent(0, "Hats", cameraSettings(0.65, 0, 40, 0.7), false),
    clotheComponent(1, "Glasses", cameraSettings(0.65, 20, 40, 0.5), false),
    clotheComponent(2, "Ears", cameraSettings(0.65, 0, 40, 0.7), false),
    clotheComponent(6, "Watches", cameraSettings(0, 0, 40, 0.7)),
    clotheComponent(7, "Bracelets", cameraSettings(0, 0, 40, 0.7)),
]

const mainMenu = new Menu("Clothes Screenshots", "", new Point(1250, 150));
const controlMenu = new Menu("Control Menu", "", new Point(1250, 150));
const startScreenshotsTakingItem = new UIMenuItem("Start");
const stopScreenshotsTakingItem = new UIMenuItem("Stop");

let selectComponent = null;

controlMenu.AddItem(startScreenshotsTakingItem);
controlMenu.AddItem(stopScreenshotsTakingItem);

controlMenu.ItemSelect.on((item, index) => {
    if (item == startScreenshotsTakingItem) {
        startScreenshots();
    }

    if (item == stopScreenshotsTakingItem) {
        stopScreenshots();
    }
});

controlMenu.MenuOpen.on(() => {
    mainMenu.Close(true);
})

controlMenu.MenuClose.on((isNotBack) => {
    if (!screenshotsTakingProcessStarted) {
        selectComponent = null;
    }
})

const clothesComponentsMenu = new Menu("Clothes Components", "", new Point(1250, 150));
const propsComponentsMenu = new Menu("Props Components", "", new Point(1250, 150));

const clothesComponentsMenuItem = new UIMenuItem("Clothes");
const propsComponentsMenuItem = new UIMenuItem("Props");

mainMenu.BindMenuToItem(clothesComponentsMenu, clothesComponentsMenuItem); 
mainMenu.BindMenuToItem(propsComponentsMenu, propsComponentsMenuItem);

for (const clothesComponent of clothesComponents) {
    const menuItem = new UIMenuItem(clothesComponent.name, "", clothesComponent);
    clothesComponentsMenu.AddItem(menuItem);
}

clothesComponentsMenu.ItemSelect.on((item, index) => {
    clothesComponentsMenu.Close(false);
    controlMenu.Open();
    selectComponent = item.Data;
})

for (const propsComponent of propsComponents) {
    const menuItem = new UIMenuItem(propsComponent.name, "", propsComponent);
    propsComponentsMenu.AddItem(menuItem);
}

propsComponentsMenu.ItemSelect.on((item, index) => {
    propsComponentsMenu.Close(false);
    controlMenu.Open();
    selectComponent = item.Data;
})

mp.keys.bind(openMenuKey, false, () => {
    if (screenshotsTakingProcessStarted) {
        controlMenu.Visible = !controlMenu.Visible;
        return;
    }

    if (controlMenu.Visible) {
        return;
    }

    mainMenu.Visible = !mainMenu.Visible;
})

let camera = null;
let screenshotsTakingProcessStarted = false;

let playerPosition = null;
let playerHeading = 0;

let viewPed = null;

let currentVariation = 0;
let currentTexture = 0;

let screenRenderId = null;
let screens = [];

async function startScreenshots() {
    if (screenshotsTakingProcessStarted) {
        return;
    }

    screenshotsTakingProcessStarted = true;
    
    await createPed();
    
    player.freezePosition(true);
    player.setVisible(false, false);
    player.position = new mp.Vector3(viewPed.position.x, viewPed.position.y, viewPed.position.z - 5);
    
    createGreenZone();

    createCamera();

    mp.game.ui.displayAreaName(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayCash(false);
    mp.gui.chat.show(false);
    controlMenu.Visible = false;

    await mp.game.waitAsync(1000);

    const componentId = selectComponent.id;
    const componentName = selectComponent.name;
    const hideHead = selectComponent.hideHead;
    const isProp = propsComponents.some(component => component == selectComponent);

    viewPed.freezePosition(true);

    for (let i = 0; i < getDrawablesNumbers(componentId, isProp); i++) {
        for (let j = 0; j < getTexturesNumbers(componentId, i, isProp); j++) {
            while (controlMenu.Visible) {
                await mp.game.waitAsync(1000);
            }

            if (!screenshotsTakingProcessStarted)
                return;

            hideBodyParts(viewPed, hideHead);

            await mp.game.waitAsync(100);

            if (isProp) {
                setPropsVariation(viewPed, componentId, i, j, true);
            } else {
                setComponentVariation(viewPed, componentId, i, j, 0);
            }

            mp.console.logInfo(`isProp: ${isProp}| ${componentId} -> ${i} -> ${j}`);

            currentVariation = i;
            currentTexture = j;
            await mp.game.waitAsync(100);
            await takeScreenshot();
            await mp.game.waitAsync(3000);
        }
    }

    stopScreenshots();
    mp.gui.chat.push(`All components of clothing ${componentName} are screened`);
}

async function createPed() {
    if (viewPed) {
        viewPed.destroy();
        viewPed = null;
    }

    playerPosition = new mp.Vector3(player.position.x, player.position.y, player.position.z);

    viewPed = mp.peds.new(
        player.model, 
        new mp.Vector3(player.position.x, player.position.y, player.position.z + 100),
        player.getHeading(2),
        player.dimension
    );

    while (!viewPed.hasOwnProperty("handle") || viewPed.handle == 0) {
        await mp.game.waitAsync(100);
    }

    hideBodyParts(viewPed);
}

function hideBodyParts(ped, hideHead) {    
    setComponentVariation(ped, 0, hideHead ? -1 : 0, 0, 0);
    setComponentVariation(ped, 1, -1, -1, 0);
    setComponentVariation(ped, 2, -1, -1, 0);
    setComponentVariation(ped, 3, -1, -1, 0);
    setComponentVariation(ped, 4, -1, -1, 0);
    setComponentVariation(ped, 5, -1, -1, 0);
    setComponentVariation(ped, 6, -1, -1, 0);
    setComponentVariation(ped, 7, -1, -1, 0);
    setComponentVariation(ped, 8, -1, -1, 0);
    setComponentVariation(ped, 9, -1, -1, 0);
    setComponentVariation(ped, 10, -1, -1, 0);
    setComponentVariation(ped, 11, -1, -1, 0);

    mp.game.ped.clearAllProps(ped.handle);
}

function createGreenZone() {
    if (viewPed == null) {
        return;
    }

    const rot = viewPed.getRotation(2);

    const frontPosition = viewPed.getOffsetFromInWorldCoords(0, 5, 0);
    const backPosition = viewPed.getOffsetFromInWorldCoords(0, -5, 0);
    const rightPosition = viewPed.getOffsetFromInWorldCoords(10, 0, 0);
    const leftPosition = viewPed.getOffsetFromInWorldCoords(-10, 0, 0);
    const upPosition = viewPed.getOffsetFromInWorldCoords(0, 0, 10);
    const downPosition = viewPed.getOffsetFromInWorldCoords(0, 0, -10);

    screens.push(CreateModel("prop_big_cin_screen", frontPosition, new mp.Vector3(rot.x, rot.y, rot.z)));
    screens.push(CreateModel("prop_big_cin_screen", backPosition, new mp.Vector3(rot.x + 180, rot.y, rot.z)))
    screens.push(CreateModel("prop_big_cin_screen", rightPosition, new mp.Vector3(rot.x, rot.y, rot.z - 90)))
    screens.push(CreateModel("prop_big_cin_screen", leftPosition, new mp.Vector3(rot.x, rot.y, rot.z + 90)))
    screens.push(CreateModel("prop_big_cin_screen", upPosition, new mp.Vector3(rot.x + 90, rot.y, rot.z)))
    screens.push(CreateModel("prop_big_cin_screen", downPosition, new mp.Vector3(rot.x - 90, rot.y, rot.z)))

    screenRenderId = CreateRenderTarget("cinscreen", "prop_big_cin_screen");
}

function createCamera() {
    playerHeading = viewPed.getHeading(2);

    const cameraSettings = selectComponent.cameraSettings;
    const playerFrontPosition = xyInFrontOfPos(viewPed.position, playerHeading, cameraSettings.distance);

    const cameraPosition = new mp.Vector3(
        playerFrontPosition.x,
        playerFrontPosition.y,
        playerFrontPosition.z + cameraSettings.height
    );
    const pointAtCoord = new mp.Vector3(
        viewPed.position.x,
        viewPed.position.y,
        viewPed.position.z + cameraSettings.height
    );

    camera = mp.cameras.new(
        'default',
        cameraPosition,
        new mp.Vector3(0, 0, 0),
        cameraSettings.fov
    );

    camera.pointAtCoord(pointAtCoord.x, pointAtCoord.y, pointAtCoord.z);
    camera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    viewPed.setHeading(playerHeading + cameraSettings.headingOffset);
}

async function takeScreenshot() {
    viewPed.clearTasks();
    viewPed.clearTasksImmediately();

    await mp.game.waitAsync(200);
    const fileName = `${selectComponent.name}_${selectComponent.id}_${currentVariation}_${currentTexture}`;
    mp.gui.takeScreenshot(fileName, 0, 100, 0);
}

function stopScreenshots() {
    if (camera) {
        camera.setActive(false);
        camera.destroy();
        camera = null;
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }

    if (viewPed) {
        viewPed.destroy();
        viewPed = null;
    }

    player.freezePosition(false);
    player.setVisible(true, false);
    player.position = new mp.Vector3(playerPosition.x, playerPosition.y, playerPosition.z + 0.5);

    mp.game.ui.displayAreaName(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayCash(true);
    mp.gui.chat.show(true);

    for (const elem of screens) {
        if (elem && mp.objects.exists(elem)) {
            elem.destroy();
        }
    }

    screens = [];
    screenRenderId = null;
    screenshotsTakingProcessStarted = false;
}

function setComponentVariation(ped, componentId, drawableId, textureId, paletteId) {
    mp.game.ped.setComponentVariation(ped.handle, componentId, drawableId, textureId, paletteId);
}

function setPropsVariation(ped, componentId, drawableId, TextureId, attach) {
    mp.game.ped.setPropIndex(ped.handle, componentId, drawableId, TextureId, attach);
}

function getDrawablesNumbers(componentId, isProp) {
    return isProp
        ? player.getNumberOfPropDrawableVariations(componentId)
        : player.getNumberOfDrawableVariations(componentId);
}

function getTexturesNumbers(componentId, drawableId, isProp) {
    return isProp
    ? player.getNumberOfPropTextureVariations(componentId, drawableId)
    : player.getNumberOfTextureVariations(componentId, drawableId);
}

function xyInFrontOfPos(pos, heading, dist) {
    heading *= Math.PI / 180;
    pos.x += (dist * Math.sin(-heading));
    pos.y += (dist * Math.cos(-heading));
    return pos;
}

function CreateModel(model, pos, rot)
{
    if(!mp.game.streaming.hasModelLoaded(mp.game.joaat(model)))
        mp.game.streaming.requestModel(mp.game.joaat(model));
    while(!mp.game.streaming.hasModelLoaded(mp.game.joaat(model)))
        mp.game.wait(0);

    return mp.objects.new(mp.game.joaat(model), pos,
    {
        rotation: rot,
        alpha: 255,
        dimension: mp.players.local.dimension
    });
}

function CreateRenderTarget(name, model)
{
    if(!mp.game.ui.isNamedRendertargetRegistered(name))
        mp.game.ui.registerNamedRendertarget(name, false); //Register render target
    
    if(!mp.game.ui.isNamedRendertargetLinked(mp.game.joaat(model)))
        mp.game.ui.linkNamedRendertarget(mp.game.joaat(model)); //Link it to all models
    
    if(mp.game.ui.isNamedRendertargetRegistered(name))
        return mp.game.ui.getNamedRendertargetRenderId(name); //Get the handle
    
    return -1;
}

function RenderThings(id)
{
    mp.game.ui.setTextRenderId(id); //Set render ID of render target
    mp.game.graphics.set2dLayer(4); //Only layer 4 works
    mp.game.graphics.drawRect(0.5, 0.5, 1, 1, 0, 255, 0, 255); //Draw rect is always behind text/sprites
    mp.game.ui.setTextRenderId(1); //Do not forget to reset the render ID. 1 is always the default render target the game uses
}

mp.events.add("render", () => {
    if (screenshotsTakingProcessStarted && screenRenderId != null) {
        RenderThings(screenRenderId);
    }
});