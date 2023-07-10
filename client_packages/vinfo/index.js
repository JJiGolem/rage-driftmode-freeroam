const NativeUI = require("nativeui");
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;

let dlEnabled = false;

const vehInfoItem = new UIMenuCheckboxItem("Vehicle Info", false);
dr.driftMenu.AddItem(vehInfoItem);
dr.driftMenu.CheckboxChange.on((item, checked) => {
  if (item == vehInfoItem) {
    dlEnabled = checked;
    const notifyMessage = `<font color="#0099ff">[Vehicle Info]</font> ${dlEnabled ? "~w~Showing" : "~c~Hidding"}`;
    mp.game.graphics.notify(notifyMessage);
  }
});

mp.events.add("render", () => {
  if (!dlEnabled) {
    return;
  }

  mp.vehicles.forEachInStreamRange((vehicle) => {
    if (mp.players.local.position.subtract(vehicle.position).length() >= 10) {
      return;
    }

    const drawPosition = [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3];
    const displayName = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model);
    const labelText = mp.game.ui.getLabelText(displayName);
    const modelName = labelText == "NULL" ? displayName : labelText;
    mp.game.graphics.drawText(`~b~Id: ~w~${vehicle.remoteId}\n~b~Model: ~w~${modelName}\n~b~Position: ~w~${vehicle.position.x.toFixed(2)}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`, drawPosition, {
      font: 0,
      color: [255, 255, 255, 185],
      scale: [0.25, 0.25],
      outline: true,
      centre: false
    });
    mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Health: ~w~${vehicle.getHealth()}`, drawPosition, {
      font: 0,
      color: [255, 255, 255, 185],
      scale: [0.25, 0.25],
      outline: true,
      centre: false
    });
  });
});