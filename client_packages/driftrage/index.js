global.dr = {};

require("driftrage/drifting.js");
require("driftrage/driftCounter.js");
require("driftrage/mainmenu.js");

mp.events.add("render", () =>
{
	dr.driftMngr.pulseDrift();

	const localPlayer = mp.players.local;
	const vehicle = localPlayer.vehicle;
	if (vehicle) {
		
	}
});


setInterval(() =>
{
	dr.driftMngr.pulse();
}, 250);

mp.gui.chat.safeMode = false;
mp.gui.chat.push("Welcome to Luv test server");
mp.gui.chat.push(`<br/>Available hotkeys:
					<br/>- F2: Main Menu
				<br/>Available commands:
					<br/>- /outfit [id] - change your outfit
					<br/>- /veh [modelName] - spawn vehicle
					<br/>- /vehdel - delete vehicle you are sitting in
					<br/>- /vehdelall - delete all spawned vehicles
				`);
mp.gui.chat.safeMode = true;