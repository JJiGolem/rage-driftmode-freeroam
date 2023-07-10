const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const ItemsCollection = NativeUI.ItemsCollection;
const Point = NativeUI.Point;

const menu = new Menu("Vehicle Settings", "", new Point(1250, 150));
menu.Visible = false;

const vehicleRepairItem = new UIMenuItem("Repair");
const vehicleWashItem = new UIMenuItem("Wash");
const vehInfoItem = new UIMenuCheckboxItem("Vehicle Info", false);

menu.AddItem(vehicleRepairItem);
menu.AddItem(vehicleWashItem);
menu.AddItem(vehInfoItem);


menu.ItemSelect.on((item, index) => {
  const localPlayer = mp.players.local;
  const vehicle = localPlayer.vehicle;
  
  if (!vehicle) {
    mp.game.graphics.notify("You have to sit in the car");
    return;
  }

  if (item == vehicleRepairItem) {
    vehicle.setFixed();
    vehicle.setDeformationFixed();
    vehicle.setEngineHealth(1000);
    vehicle.setBodyHealth(1000);
  } 
  else if (item == vehicleWashItem) {
    vehicle.setDirtLevel(0.0);
  }
});

menu.CheckboxChange.on((item, checked) => {
    if (item == vehInfoItem) {
      mp.events.call("toggle_vehicle_info", checked);
    }
  });

const menuItem = new UIMenuItem("Vehicle Settings");
dr.driftMenu.AddItem(menuItem);
dr.driftMenu.BindMenuToItem(menu, menuItem);