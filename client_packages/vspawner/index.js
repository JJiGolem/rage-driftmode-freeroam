const getUserInputAsync = require("./utils/basicInput")
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const vehicles = require("vspawner/vehicleHashes");
const customVehicles = require("vspawner/dlcVehicleNames")
const categoryTitles = ["Compacts", "Sedans", "SUVs", "Coupes", "Muscle", "Sports Classics", "Sports", "Super", "Motorcycles", "Off-Road", "Industrial", "Utility", "Vans", "Cycles", "Boats", "Helicopters", "Planes", "Service", "Emergency", "Military", "Commercial", "Trains", "Open Wheel"];

// main menu
const mainMenu = new Menu("Vehicle Spawner", "", new Point(1250, 150));
mainMenu.Visible = false;

const vehicleEnterNameItem = new UIMenuItem("Spawn by model name");
mainMenu.AddItem(vehicleEnterNameItem);
mainMenu.ItemSelect.on(async (item, index) => {
  if (item == vehicleEnterNameItem) {
    try {
      const vehicleModelName = await getUserInputAsync({
        title: "Enter vehicle model name", // Title shown on the input box
        defaultText: "", // Default value of the input box
        maxLength: 32, // Obvious enough, maximum length of the input
        showMaxLength: false, // If true, will display max length on title
        trimResult: true, // Removes whitespace from the player's input
        rejectIfEmpty: false, // If true, empty input causes promise rejection instead of resolving with an empty string
      })

      if (!vehicleModelName) {
        return;
      }
  
      mp.events.callRemote("vspawner_Spawn", vehicleModelName);
    } catch (error) {
      mp.console.logError(error);
    }
  }
})

let categoryMenus = [];

// categories
function addMainMenuCategory(categoryName) {
  const categoryItem = new UIMenuItem(categoryName);
  const categoryMenu = new Menu(categoryName, "", new Point(1250, 150));
  categoryMenu.Visible = false;

  categoryMenu.ItemSelect.on((item, index) => {
    mp.events.callRemote("vspawner_Spawn", item.Text);
  });

  categoryMenus.push(categoryMenu);

  mainMenu.AddItem(categoryItem);
  mainMenu.BindMenuToItem(categoryMenu, categoryItem);
}

// Custom Vehicles from DLC
addMainMenuCategory("Custom Vehicles")
for (const index in customVehicles) {
  const modelName = customVehicles[index];
  const modelHash = mp.game.joaat(modelName);
  const displayName = mp.game.vehicle.getDisplayNameFromVehicleModel(modelHash);
  const vehicleItem = new UIMenuItem(modelName);
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

const menuItem = new UIMenuItem("Vehicle Spawn");
dr.driftMenu.AddItem(menuItem);
dr.driftMenu.BindMenuToItem(mainMenu, menuItem);