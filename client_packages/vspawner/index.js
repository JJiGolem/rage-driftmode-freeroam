const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const vehicles = require("vspawner/vehicleHashes");
const customVehicles = require("vspawner/dlcVehicleNames")
const categoryTitles = ["Compacts", "Sedans", "SUVs", "Coupes", "Muscle", "Sports Classics", "Sports", "Super", "Motorcycles", "Off-Road", "Industrial", "Utility", "Vans", "Cycles", "Boats", "Helicopters", "Planes", "Service", "Emergency", "Military", "Commercial", "Trains"];

// main menu
const mainMenu = new Menu("Vehicle Spawner", "", new Point(1250, 150));
mainMenu.Visible = false;

mainMenu.ItemSelect.on((item, index) => {
    mainMenu.Visible = false;
    curCategory = index;
    categoryMenus[index].Visible = true;
    transition = true;
});

let categoryMenus = [];
let curCategory = -1;
let transition = false;

// categories
function addMainMenuCategory(categoryName) {
    mainMenu.AddItem(new UIMenuItem(categoryName, ""));
    let categoryMenu = new Menu(categoryName, "", new Point(1250, 150));
    categoryMenu.Visible = false;
    
    categoryMenu.ItemSelect.on((item, index) => {
        if (!transition) mp.events.callRemote("vspawner_Spawn", item.Text);
        transition = false;
    });
    
    categoryMenu.MenuClose.on(() => {
        curCategory = -1;
        mainMenu.Visible = true;
    });
    
    categoryMenus.push(categoryMenu);
}

// Custom Vehicles from DLC
addMainMenuCategory("Custom Vehicles")
for (const index in customVehicles) {
    const modelName = customVehicles[index];
    const modelHash = mp.game.joaat(modelName);
    const displayName = mp.game.vehicle.getDisplayNameFromVehicleModel(modelHash);
    const vehicleItem = new UIMenuItem(modelName, "");
    vehicleItem.SetRightLabel(displayName ? "" : displayName);
    categoryMenus[0].AddItem(vehicleItem);
}

for (let i = 0; i < categoryTitles.length; i++) {
    addMainMenuCategory(categoryTitles[i]);
}

// vehicles
for (let prop in vehicles) {
    if (vehicles.hasOwnProperty(prop)) {
        let vehicleClass = mp.game.vehicle.getVehicleClassFromName(vehicles[prop]);
        let vehicleName = mp.game.ui.getLabelText(prop);
        let vehicleItem = new UIMenuItem(prop, "");
        vehicleItem.SetRightLabel(vehicleName == "NULL" ? "" : vehicleName);

        // first index => Custom Vehicles
        const fixIndex = vehicleClass + 1;
        categoryMenus[fixIndex].AddItem(vehicleItem);
    }
}

mp.events.add("toggle_veh_spawn_menu", () =>
{
    if (curCategory > -1) {
        categoryMenus[curCategory].Visible = !categoryMenus[curCategory].Visible;
    } else {
        mainMenu.Visible = !mainMenu.Visible;
    }	
});
