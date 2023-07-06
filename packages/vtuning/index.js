mp.events.add("vtuning_set", (player, modType, modIndex) =>
{
	let vehicle = player.vehicle;
	
	if(vehicle)
	{
		vehicle.setMod(modType, modIndex);
	}
});