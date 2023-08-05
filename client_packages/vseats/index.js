const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const ItemsCollection = NativeUI.ItemsCollection;
const Point = NativeUI.Point;


mp.game.controls.useDefaultVehicleEntering = true;

const seatsMenu = new Menu("Vehicle Seats", "", new Point(1250, 150));
seatsMenu.Visible = false;
const seatsMenuItem = new UIMenuItem("Vehicle Seats");

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
  if (dr.driftMenu.MenuItems.includes(seatsMenuItem)) {
    // mp.game.graphics.notify(`Vehicle seats Item already included`);
    return;
  }

  dr.driftMenu.BindMenuToItem(seatsMenu, seatsMenuItem);
  loadSeats();
})

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
  if (mp.players.local.vehicle == vehicle) {
    // mp.game.graphics.notify("Are you still in your car");
    return;
  }

  if (seatsMenu.Visible) {
    seatsMenu.GoBack();
    seatsMenu.Close(true);
    mp.game.graphics.notify("Vehicle Seats ~r~closed");
  }

  seatsMenu.Clear();
  dr.driftMenu.RemoveItem(seatsMenuItem);
  dr.driftMenu.ReleaseMenuFromItem(seatsMenuItem);
})


function loadSeats() {
  seatsMenu.Clear();

  const localplayer = mp.players.local;
  const vehicle = localplayer.vehicle;
  
  // Menu Items
  const refreshSeatsItem = new UIMenuItem("Refresh");
  seatsMenu.AddItem(refreshSeatsItem);

  const shuffleSeatItem = new UIMenuItem("Shuffle");
  seatsMenu.AddItem(shuffleSeatItem);

  const driverSeatItem = new UIMenuItem("Driver Seat", "", -1);
  seatsMenu.AddItem(driverSeatItem);

  for (let i = 0; i < vehicle.getMaxNumberOfPassengers(); i++) {
    if (vehicle.isSeatFree(i)) {
      const seatItem = new UIMenuItem(`Seat ${i+1}`, "", i);
      seatsMenu.AddItem(seatItem);
    }
  }
}

seatsMenu.ItemSelect.on((item, index) => {
  const localplayer = mp.players.local;
  const vehicle = localplayer.vehicle;

  if (!vehicle) {
    return;
  }
  
  if (item.Text == "Refresh") {
    loadSeats();
    return;
  }

  let mySeat = -2;
  for (let i = 0; i < vehicle.getMaxNumberOfPassengers(); i++) {
    if (vehicle.getPedInSeat(i) == localplayer) {
      mySeat = i;
      break;
    }
  }

  mp.events.call("playerLeaveVehicle", vehicle, mySeat);

  if (item.Text == "Shuffle") {
    localplayer.taskShuffleToNextVehicleSeat(vehicle.handle);
    return;
  }

  const seat = parseInt(item.Data);
  localplayer.taskWarpIntoVehicle(vehicle.handle, seat);

  // localplayer.taskEnterVehicle(vehicle.handle, 50, seat, 2.0, 3, 0);
  // localplayer.setIntoVehicle(vehicle.handle, parseInt(item.Data));
})
