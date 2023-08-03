const locations = require("./locations/locations")
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const locationsMenu = new Menu("Locations", "", new Point(1250, 150));
locationsMenu.Visible = false;

const menuItem = new UIMenuItem("Locations");
dr.driftMenu.AddItem(menuItem);
dr.driftMenu.BindMenuToItem(locationsMenu, menuItem);


locations.forEach((loc) => {
  const locationItem = new UIMenuItem(loc.name, loc.tag, loc.position);
  locationItem.SetRightLabel(loc.tag);
  locationsMenu.AddItem(locationItem);
})

locationsMenu.ItemSelect.on((item, index) => {
  const {x, y, z} = item.Data;
  mp.players.local.setCoordsNoOffset(x, y, z + 0.72, true, true, true);
})