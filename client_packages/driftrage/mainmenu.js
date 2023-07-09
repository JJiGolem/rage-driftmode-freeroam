const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;
	
dr.driftMenu = new Menu("Main Menu", "", new Point(1250, 150));
dr.driftMenu.Visible = false;

dr.driftMenu.ItemSelect.on((item, index) => 
{
	dr.driftMenu.Visible = false;
	mp.events.call(item.eventName);
});

let vtMenu = new UIMenuItem("Vehicle Tuning");
vtMenu.eventName = "toggle_veh_tuning_menu";
let vsMenu = new UIMenuItem("Vehicle Spawn");
vsMenu.eventName = "toggle_veh_spawn_menu";

dr.driftMenu.AddItem(vtMenu);
dr.driftMenu.AddItem(vsMenu);

// F2
mp.keys.bind(0x71, false, () =>  {
	dr.driftMenu.Visible = !dr.driftMenu.Visible;
});