const natives = {
  ForceCloseTextInputBox: () => mp.game.invoke("0x8817605C2BA76200"),
  SetVehicleReduceGripLevel: (vehicleHandle, value) => mp.game.invoke("0x6DEE944E1EE90CFB", vehicleHandle, value), // value range (0-3)
  SetDriftTyresEnabled: (vehicleHandle, toggle) => mp.game.invoke("0x5AC79C98C5C17F05", vehicleHandle, toggle),
}

exports = natives