const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const vehicles = require("vspawner/vehicleHashes");
const categoryTitles = ["Compacts", "Sedans", "SUVs", "Coupes", "Muscle", "Sports Classics", "Sports", "Super", "Motorcycles", "Off-Road", "Industrial", "Utility", "Vans", "Cycles", "Boats", "Helicopters", "Planes", "Service", "Emergency", "Military", "Commercial", "Trains"];

// main menu
let mainMenu = new Menu("Vehicle Spawner", "", new Point(1250, 150));
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
for (let i = 0; i < categoryTitles.length; i++) {
    mainMenu.AddItem(new UIMenuItem(categoryTitles[i], ""));

    let categoryMenu = new Menu(categoryTitles[i], "", new Point(1250, 150));
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

// vehicles
for (let prop in vehicles) {
    if (vehicles.hasOwnProperty(prop)) {
        let vehicleClass = mp.game.vehicle.getVehicleClassFromName(vehicles[prop]);
        let vehicleName = mp.game.ui.getLabelText(prop);
        let vehicleItem = new UIMenuItem(prop, "");
        vehicleItem.SetRightLabel(vehicleName == "NULL" ? "" : vehicleName);
        categoryMenus[vehicleClass].AddItem(vehicleItem);
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
