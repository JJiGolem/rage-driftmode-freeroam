const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const ItemsCollection = NativeUI.ItemsCollection;
const Point = NativeUI.Point;

const menu = new Menu("World Settings", "", new Point(1250, 150));
menu.Visible = false;

const hours = Array.from(new Array(24), (x, i) => i.toString().padStart(2, '0'))
const minutes = Array.from(new Array(60), (x, i) => i.toString().padStart(2, '0'))
const slowMotionValues = Array.from(new Array(11), (x, i) => parseFloat(i / 10).toFixed(1))
const weathers = ['CLEAR','EXTRASUNNY','CLOUDS','OVERCAST','RAIN','CLEARING','THUNDER','SMOG','FOGGY','XMAS','SNOWLIGHT','BLIZZARD']

const slowMotionItem = new UIMenuListItem("Slow motion", "", new ItemsCollection(slowMotionValues), slowMotionValues.length - 1);
const clockPauseItem = new UIMenuCheckboxItem("Time freeze", false);
const hoursListItem = new UIMenuListItem("Hours", "", new ItemsCollection(hours));
const minutesListItem = new UIMenuListItem("Minutes", "", new ItemsCollection(minutes));
const weathersListItem = new UIMenuListItem("Weathers", "", new ItemsCollection(weathers));
const enableSnowItem = new UIMenuCheckboxItem("Enable/Disable snow", mp.game1.gameplay.enableSnow);

menu.AddItem(slowMotionItem);
menu.AddItem(clockPauseItem);
menu.AddItem(hoursListItem);
menu.AddItem(minutesListItem);
menu.AddItem(weathersListItem);
menu.AddItem(enableSnowItem);

menu.ListChange.on((item, listIndex) => {
  // mp.gui.chat.push(`HourIndex: ${hoursListItem.Index} | MinuteIndex: ${minutesListItem.Index}`);
  // mp.gui.chat.push(`setTimeScale: ${slowMotionItem.SelectedItem}, ${slowMotionItem.SelectedValue}`);
  // mp.gui.chat.push(`setWeatherTypeNow: ${weathersListItem.SelectedItem}, ${weathersListItem.SelectedValue}`);
  mp.game.time.setClockTime(hoursListItem.Index, minutesListItem.Index, 0);
  mp.game.gameplay.setTimeScale(parseFloat(slowMotionItem.SelectedValue));
  mp.game.gameplay.setWeatherTypeNow(weathersListItem.SelectedValue);
});

menu.CheckboxChange.on((item, checked) => {
  if (item == clockPauseItem) {
    const notifyMessage = "Game time " + checked ? "frozed" : "unfrozen";
    mp.game.graphics.notify(notifyMessage);
    mp.game.time.pauseClock(checked);
  }
  else if (item == enableSnowItem) {
    const notifyMessage = "Snow " + checked ? "enabled" : "disabled";
    mp.game.graphics.notify(notifyMessage);
    mp.game1.gameplay.enableSnow = checked;
  }
});

const worldMenuItem = new UIMenuItem("World Settings", "");
dr.driftMenu.AddItem(worldMenuItem);
dr.driftMenu.BindMenuToItem(menu, worldMenuItem);