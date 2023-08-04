mp.events.add("vtuning_set", (player, modType, modIndex) =>
{
	let vehicle = player.vehicle;
	
	if(vehicle)
	{
		vehicle.setMod(modType, modIndex);
	}
});

mp.events.add("vtuning_setWheelColor", (player, color) => {
  const vehicle = player.vehicle;
  if (vehicle) {
    vehicle.wheelColor = parseInt(color);
  }
})

mp.events.add("vtuning_setPearlescentColor", (player, color) => {
  const vehicle = player.vehicle;
  if (vehicle) {
    vehicle.pearlescentColor = parseInt(color);
  }
})