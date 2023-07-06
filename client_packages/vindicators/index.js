const localPlayer = mp.players.local;
var signal1, signal2, signalx;

mp.keys.bind(0x25, true, function() { //Left indicator

    if (signal1 && localPlayer.vehicle) {
        signal1 = false;
        mp.game.graphics.notify('Left Signal was deactivated.');
        localPlayer.vehicle.setIndicatorLights(1, false);
    } else

    if (signal2 && localPlayer.vehicle) {
    
        mp.game.graphics.notify('Left Signal was activated.');
        localPlayer.vehicle.setIndicatorLights(0, false);
        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;
        signal2 = false;
    } else if (localPlayer.vehicle) {
        mp.game.graphics.notify('Left Signal was activated.');
        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;
        signal2 = false;
    }
});

mp.keys.bind(0x27, true, function() { // Right Indicator

    if (signal2 && localPlayer.vehicle) {
        signal2 = false;
        mp.game.graphics.notify('Right Signal was deactivated.');
        localPlayer.vehicle.setIndicatorLights(0, false);
    } else
    if (signal1 && localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(1, false);
        localPlayer.vehicle.setIndicatorLights(0, true);
        signal1 = false;
        signal2 = true;
        mp.game.graphics.notify('Right Signal was activated.');
    } else if (localPlayer.vehicle) {
        mp.game.graphics.notify('Right Signal was activated.');
        localPlayer.vehicle.setIndicatorLights(0, true);
        signal2 = true;
    }
});

mp.keys.bind(0x58, true, function() { // Warning indicator

    if (signalx && localPlayer.vehicle) {
        mp.game.graphics.notify('Warning Signal was disactivated.');
        localPlayer.vehicle.setIndicatorLights(1, false);
        localPlayer.vehicle.setIndicatorLights(0, false);
        signalx = false;

    } else
    if (localPlayer.vehicle) {
        mp.game.graphics.notify('Warning Signal was activated.');
        localPlayer.vehicle.setIndicatorLights(1, true);
        localPlayer.vehicle.setIndicatorLights(0, true);
        signalx = true;
    }
})