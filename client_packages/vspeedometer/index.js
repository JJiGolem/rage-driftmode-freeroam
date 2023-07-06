let speedometerWindow = null;
let player = mp.players.local;

mp.events.add('playerEnterVehicle', () => {
   
    if(speedometerWindow != null)
	{
		speedometerWindow.destroy();
		speedometerWindow = null;
	}
	speedometerWindow = mp.browsers.new("package://vspeedometer/index.html");
});


mp.events.add('playerLeaveVehicle', () =>
{
	if(speedometerWindow != null)
	{
		speedometerWindow.destroy();
		speedometerWindow = null;
	}
});

mp.events.add('render', () =>
{
	if(player.vehicle != null && speedometerWindow != null)
	{
		let speed = player.vehicle.getSpeed() * 3.6;
        let rpm = player.vehicle.rpm;
		speedometerWindow.execute(`setSpeedValue(${speed});`);
        speedometerWindow.execute(`setRPMValue(${rpm});`);
	}
});