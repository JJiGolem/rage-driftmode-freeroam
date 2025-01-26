let UI = null;
let vehSeat, Engine, Lock;
let state = 0;
let localPlayer = mp.players.local;

mp.events.add({

    'playerEnterVehicle': () => {
        mp.game.graphics.notify(`Press ~r~B ~w~if you want to open the Vehicle Manager.`);
    },

    'doorControl': (door) => {
        if (localPlayer.vehicle) {
            if (localPlayer.vehicle.isDoorDamaged(door)) return mp.game.graphics.notify(`This Door is ~r~Damaged ~w~Please fix the Door.`);
            (localPlayer.vehicle.getDoorAngleRatio(door) > 0.1 ? localPlayer.vehicle.setDoorShut(door, false) : localPlayer.vehicle.setDoorOpen(door, false, false))
        }
    },

    'Set': (type, state) => {


        switch (type) {


            case 'seatbelt':
                if (state === 'true') {
                    localPlayer.setConfigFlag(32, false);
                    mp.game.graphics.notify('Seat belts ~g~ON')
                } else {
                    localPlayer.setConfigFlag(32, true);
                    mp.game.graphics.notify('Seat belts ~r~OFF')
                }
                break;

            case 'engine':
                if (state === 'true') {
                    mp.game.graphics.notify('Engine ~g~ON')
                    localPlayer.vehicle.setEngineOn(true, true, false);
                } else {
                    mp.game.graphics.notify('Engine ~r~OFF')
                    localPlayer.vehicle.setEngineOn(false, true, true);
                }
                break;

            case 'lights':
                if (state === 'true') {
                    localPlayer.vehicle.setLights(0);
                    mp.game.graphics.notify('Lights ~g~ON')
                } else {
                    mp.game.graphics.notify('Lights ~r~OFF')
                    localPlayer.vehicle.setLights(1);
                }
        }
    }
})

// B
mp.keys.bind(0x42, true, _ => {
    if (state === 0 && localPlayer.vehicle) {
        if (UI === null) {
            mp.gui.cursor.visible = true;
            // UI = mp.browsers.new('package://vmanager/Manager/index.html')
            UI = mp.browsers.new('http://package/browser/wwwroot/index.html')
            setTimeout(() => {
                UI.execute(`DotNet.invokeMethodAsync('SharpRageUI', 'SetActive', true);`);
            }, 5_000);
            state = 1;
            updateStatus();
        } else {
            mp.gui.cursor.visible = true;
            state = 1
            UI.execute("$('body').fadeIn('fast')");
            updateStatus();
        }
    } else if (state === 1 && localPlayer.vehicle) {
        mp.gui.cursor.visible = false;
        state = 0;
        UI.execute(`DotNet.invokeMethodAsync('SharpRageUI', 'SetActive', false);`);
        // UI.execute("$('body').fadeOut('fast')");
    }

});

function updateStatus() {
    if (UI && localPlayer.vehicle) {
        Engine = localPlayer.vehicle.getIsEngineRunning() ? true : false;
        let {
            lightsOn,
            highbeamsOn
        } = localPlayer.vehicle.getLightsState(0, 0);
        let seatbelt = localPlayer.getConfigFlag(32, true);

        if (Engine) {
            UI.execute(`$('#engine').prop('checked', true)`)
        } else {
            UI.execute(`$('#engine').prop('checked', false)`)
        }

        if (lightsOn === 0) {
            UI.execute(`$('#lights').prop('checked', false)`)
        } else {
            UI.execute(`$('#lights').prop('checked', true)`)
        }

        if (seatbelt === 0) {
            UI.execute(`$('#seatbelt').prop('checked', true)`)
        } else {
            UI.execute(`$('#seatbelt').prop('checked', false)`)
        }
    }
}