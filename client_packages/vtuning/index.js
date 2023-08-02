const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const Point = NativeUI.Point;

const categoryTitles = require("./vtuning/categories");
const vehicleColors = require("./vtuning/colors");

const localplayer = mp.players.local;

const tuningMenu = new Menu("Vehicle Tuning", "", new Point(1250, 150));
const tuningItem = new UIMenuItem("Vehicle Tuning");

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
  if (seat != -1) {
    return;
  }

  dr.driftMenu.AddItem(tuningItem);
  dr.driftMenu.BindMenuToItem(tuningMenu, tuningItem);
  loadModsToMenu(vehicle);
})

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
  if (tuningMenu.Visible || Array.from(tuningMenu.Children.values()).some(m => m.Visible)) {
    tuningMenu.GoBack();
    tuningMenu.Close(true);
    mp.game.graphics.notify("Tuning ~r~closed");
  }

  tuningMenu.Clear();
  dr.driftMenu.RemoveItem(tuningItem);
  dr.driftMenu.ReleaseMenuFromItem(tuningItem);
})

function loadModsToMenu(vehicle) {
  const turboItem = new UIMenuCheckboxItem("Turbo", false);
  tuningMenu.AddItem(turboItem);

  const lowGripTiresItem = new UIMenuCheckboxItem("Low Grip Tires", false);
  tuningMenu.AddItem(lowGripTiresItem);
  
  // categories
  for (let i = 0; i < categoryTitles.length; i++) {
    let numMods = vehicle.getNumMods(i);

    if (numMods > 0 && categoryTitles[i].length > 0) {
      const categoryMenu = new Menu(categoryTitles[i], "", new Point(1250, 150));
      categoryMenu.Visible = false;

      categoryMenu.ItemSelect.on((item, index) => {
        mp.events.callRemote("vtuning_set", item.modType, item.modIndex);
        mp.game.graphics.notify(`Установлен ${categoryTitles[i]} на ${item.Text}`);
      });

      for (let modIndex = -1; modIndex < numMods; modIndex++) {
        if (modIndex == -1) {
          let vehicleItem = new UIMenuItem("Default", "");
          vehicleItem.modType = i;
          vehicleItem.modIndex = modIndex;
          categoryMenu.AddItem(vehicleItem);
          continue;
        }

        const modLabel = vehicle.getModTextLabel(i, modIndex);
        const labelText = typeof (modLabel) == "string" ? mp.game.ui.getLabelText(modLabel) : "NULL";
        const vehicleName = labelText != "NULL" ? labelText : `${categoryTitles[i]} #${modIndex}`;
        const vehicleItem = new UIMenuItem(vehicleName, "");
        vehicleItem.modType = i;
        vehicleItem.modIndex = modIndex;
        categoryMenu.AddItem(vehicleItem);
      }

      const categoryItem = new UIMenuItem(categoryTitles[i]);
      tuningMenu.AddItem(categoryItem);
      tuningMenu.BindMenuToItem(categoryMenu, categoryItem);
    }
  }

  const colorsMenu = new Menu("Colors", "", new Point(1250, 150));
  for (let i = 0; i < vehicleColors.length; i++) {
    const color = vehicleColors[i];
    const colorItem = new UIMenuItem(color.Description, "", color.ID);
    // colorItem.SetRightLabel(`<font color="${color.HEX}">█</font>`);
    colorsMenu.AddItem(colorItem);
  }

  colorsMenu.ItemSelect.on((item, index) => {
    const colorId = parseInt(item.Data);
    if (localplayer.vehicle) {
      const color = vehicleColors.find(c => parseInt(c.ID) == colorId);
      localplayer.vehicle.setColours(colorId, colorId);
      mp.game.graphics.notify(`Установлен <font color="${color.HEX}">цвет</font>`);
    }
  })

  const colorsItem = new UIMenuItem("Colors");
  tuningMenu.AddItem(colorsItem);
  tuningMenu.BindMenuToItem(colorsMenu, colorsItem);
}

tuningMenu.CheckboxChange.on((item, checked) => {
  if (!localplayer.vehicle) {
    return;
  }

  if (item.Text == "Turbo") {
    localplayer.vehicle.toggleMod(18, checked);
    mp.game.graphics.notify(`Турбо ${checked ? "~g~установлен" : "~r~снят"}`);
  }

  if (item.Text == "Low Grip Tires") {
    mp.game.invoke("0x5AC79C98C5C17F05", localplayer.vehicle, checked);
    mp.game.invoke("0x5AC79C98C5C17F05", localplayer.vehicle.handle, checked);
    localplayer.vehicle.setTyresCanBurst(checked);
    mp.game.graphics.notify(`Шины с низким трением ${checked ? "~g~установлены" : "~r~сняты"}`);
  }
});