const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const Point = NativeUI.Point;

const natives = require("./utils/natives");

const categoryTitles = require("./vtuning/categories");
const vehicleColors = require("./vtuning/colors");
const vehicleModColors = ["Normal", "Metallic", "Pearl", "Matte", "Metal", "Chrome", "Chameleon"];

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

  addColorsToMenu();
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
    natives.SetDriftTyresEnabled(localplayer.vehicle.handle, checked);
    localplayer.vehicle.setTyresCanBurst(checked);
    mp.game.graphics.notify(`Шины с низким трением ${checked ? "~g~установлены" : "~r~сняты"}`);
  }
});


function addColorsToMenu() {
  const colorsMainMenu = new Menu("Colors", "", new Point(1250, 150));
  const colorsMainItem = new UIMenuItem("Colors");
  tuningMenu.BindMenuToItem(colorsMainMenu, colorsMainItem);

  const primaryColorItem = new UIMenuItem("Primary Color");
  const secondaryColorItem = new UIMenuItem("Secondary Color");
  const primaryModColorItem = new UIMenuItem("Primary Mod Color");
  const secondaryModColorItem = new UIMenuItem("Secondary Mod Color");
  const pearlescentColorItem = new UIMenuItem("Pearlescent Color");
  const wheelsColorItem = new UIMenuItem("Wheels Color");

  primaryColorItem.SelectHandler = setPrimaryColor;
  secondaryColorItem.SelectHandler = setSecondaryColor;
  primaryModColorItem.SelectHandler = setPrimaryModColor;
  secondaryModColorItem.SelectHandler = setSecondaryModColor;
  pearlescentColorItem.SelectHandler = setPearlescenColor;
  wheelsColorItem.SelectHandler = setWheelsColor;

  const colorMenu = new Menu("Colors", "Set colors on your vehicle", new Point(1250, 150));
  
  colorsMainMenu.BindMenuToItem(colorMenu, primaryColorItem);
  colorsMainMenu.BindMenuToItem(colorMenu, secondaryColorItem);
  colorsMainMenu.BindMenuToItem(colorMenu, primaryModColorItem);
  colorsMainMenu.BindMenuToItem(colorMenu, secondaryModColorItem);
  colorsMainMenu.BindMenuToItem(colorMenu, pearlescentColorItem);
  colorsMainMenu.BindMenuToItem(colorMenu, wheelsColorItem);

  colorsMainMenu.ItemSelect.on((item, index) => {
    colorMenu.Clear();
    colorMenu.TitleText = item.Text;
    colorMenu.SubTitleText = item.Description;
    colorMenu.ItemSelectHandler = item.SelectHandler;

    if (item == primaryModColorItem || item == secondaryModColorItem) {
      for (let i = 0; i < vehicleModColors.length; i++) {
        const color = vehicleModColors[i];
        const colorItem = new UIMenuItem(color, "", i);
        colorMenu.AddItem(colorItem);
      }
      return;
    }

    for (let i = 0; i < vehicleColors.length; i++) {
      const color = vehicleColors[i];
      const colorItem = new UIMenuItem(color.Description, "", color.ID);
      colorMenu.AddItem(colorItem);
    }
  })

  colorMenu.ItemSelect.on((item, index) => {
    const colorId = parseInt(item.Data);
    if (!localplayer.vehicle) {
      return;
    }

    colorMenu.ItemSelectHandler(item, localplayer.vehicle, colorId);
  });
}

function setPrimaryColor(menuItem, vehicle, colorId) {
  const { colorPrimary, colorSecondary } = vehicle.getColours(0, 0);
  mp.game.graphics.notify(`primaryColor: ${colorPrimary}, secondaryColor: ${colorSecondary}, ColorId: ${colorId}`);
  vehicle.setColours(colorId, colorSecondary);
  
  const color = vehicleColors.find(c => parseInt(c.ID) == colorId);
  if (color) {
    mp.game.graphics.notify(`Установлен ~h~<font color="${color.HEX}">цвет</font>`);
  }
}

function setSecondaryColor(menuItem, vehicle, colorId) {
  const { colorPrimary, colorSecondary } = vehicle.getColours(0, 0);
  mp.game.graphics.notify(`primaryColor: ${colorPrimary}, secondaryColor: ${colorSecondary}, ColorId: ${colorId}`);
  vehicle.setColours(colorPrimary, colorId);
  
  const color = vehicleColors.find(c => parseInt(c.ID) == colorId);
  if (color) {
    mp.game.graphics.notify(`Установлен ~h~<font color="${color.HEX}">цвет</font>`);
  }
}

function setPrimaryModColor(menuItem, vehicle, colorId) {
  const { colorPrimary, colorSecondary } = vehicle.getColours(0, 0);
  const { pearlescentColor, wheelColor } = vehicle.getExtraColours(1, 1);
  vehicle.setModColor1(colorId, 0, 0);//Основной цвет

  const numbers = mp.game.vehicle.getNumModColors(colorId, true);

  const colorType = vehicleModColors[colorId];
  if (colorType) {
    mp.game.graphics.notify(`|${numbers}| ${vehicle.getModColor1TextLabel(true)} Установлен тип цвета ~h~${colorType}`);
  }
}

function setSecondaryModColor(menuItem, vehicle, colorId) {
  const { colorPrimary, colorSecondary } = vehicle.getColours(0, 0);
  vehicle.setModColor2(colorId, 0);// Дополнительный цвет

  const colorType = vehicleModColors[colorId];
  if (colorType) {
    mp.game.graphics.notify(`Установлен тип цвета ~h~${colorType}`);
  }
}

function setPearlescenColor(menuItem, vehicle, colorId) {
  const { pearlescentColor, wheelColor } = vehicle.getExtraColours(1, 1);
  vehicle.setExtraColours(colorId, wheelColor);
  mp.events.callRemote("vtuning_setPearlescentColor", colorId);

  const color = vehicleColors.find(c => parseInt(c.ID) == colorId);
  if (color) {
    mp.game.graphics.notify(`Установлен ~h~<font color="${color.HEX}">цвет</font>`);
  }
}

function setWheelsColor(menuItem, vehicle, colorId) {
  const { pearlescentColor, wheelColor } = vehicle.getExtraColours(1, 1);
  vehicle.setExtraColours(pearlescentColor, wheelColor);
  mp.events.callRemote("vtuning_setWheelColor", colorId);
  
  const color = vehicleColors.find(c => parseInt(c.ID) == colorId);
  if (color) {
    mp.game.graphics.notify(`Установлен ~h~<font color="${color.HEX}">цвет</font>`);
  }
}