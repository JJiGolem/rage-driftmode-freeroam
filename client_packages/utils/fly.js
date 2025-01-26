let debugOn = true;
function debugLog(msg) {
  if (debugOn) {
    mp.gui.chat.push(msg);
  }
}

let getNormalizedVector = function(vector) {
    var mag = Math.sqrt(
        vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};
let getCrossProduct = function(v1, v2) {
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};

let noClipCamera = null;
let shiftModifier = false;
let controlModifier = false;
let noClipCameraSpeeds = [0.1, 0.5, 1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100];
let noClipCameraCurrentSpeedIndex = 2;
const localplayer = mp.players.local;

let noClipEnabled = false;
let noClipSpeed = 1;
let noClipSpeedNames = ["Die", "Slow", "Medium", "Fast", "Very Fast", "Extremely Fast", "Snail Speed!"];

function noClip(enable) {
    try {
        noClipEnabled = enable;

        if (enable) {
            mp.game.graphics.notify('NoClip ~g~activated');
        } else {
            mp.game.graphics.notify('NoClip ~r~disabled');
        }

        if (!noClipEnabled) {

            let noClipEntity = localplayer.isSittingInAnyVehicle() ? localplayer.vehicle : localplayer;
            noClipEntity.freezePosition(false);

            // if (adminGodMode == false) {
                // noClipEntity.setInvincible(false);
            // }

            if (localplayer.vehicle) {
                let plPos = localplayer.vehicle.position;
                localplayer.vehicle.position = new mp.Vector3(plPos.x, plPos.y, plPos.z - localplayer.getHeightAboveGround() + 1);
            }
            else {
                let plPos = localplayer.position;
                localplayer.position = new mp.Vector3(plPos.x, plPos.y, plPos.z - localplayer.getHeightAboveGround() + 1);
            }
        }

    } catch (e) {
        debugLog(`NoClip Exception: ${e}`);
    }
};


let lastPlayerSettedVector = localplayer.position;
function startFreeCam() {
  mp.game.graphics.notify('FreeCam ~g~activated');
  lastPlayerSettedVector = localplayer.position;
  var camPos = new mp.Vector3(
      localplayer.position.x,
      localplayer.position.y,
      localplayer.position.z
  );
  var camRot = mp.game.cam.getGameplayCamRot(2);
  noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
  noClipCamera.setActive(true);
  noClipCamera.setFov(45); //45 DEFAULT
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  localplayer.freezePosition(true);
  localplayer.setInvincible(true);
  localplayer.setVisible(false, false);
  localplayer.setCollision(false, false);

  localplayer.setAlpha(0);
};

function stopFreeCam(isGroundSpawn) {
    mp.game.graphics.notify('FreeCam ~r~disabled');
    if (noClipCamera) {
        const { x, y, z } = noClipCamera.getCoord();
        localplayer.setCoordsNoOffset(x, y, z, true, true, true);
        noClipCamera.destroy(true);
        noClipCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localplayer.freezePosition(false);
    localplayer.setVisible(true, false);
    localplayer.setCollision(true, false);
    localplayer.setAlpha(255);
    
    // if (adminGodMode == false) {
        // localplayer.setInvincible(false);
    // }

    if (isGroundSpawn) {
        let plPos =localplayer.position;
        localplayer.position = new mp.Vector3(plPos.x, plPos.y, plPos.z - localplayer.getHeightAboveGround() + 1);
    }
};

mp.events.add('render', function() {
    if (!noClipCamera || mp.gui.cursor.visible) {
        return;
    }

    const positionDist = mp.game.system.vdist(
        lastPlayerSettedVector.x, lastPlayerSettedVector.y, lastPlayerSettedVector.z,
        localplayer.position.x, localplayer.position.y, localplayer.position.z
    );

    if (positionDist > 2) {
        lastPlayerSettedVector = localplayer.position;
        noClipCamera.setCoord(
            lastPlayerSettedVector.x,
            lastPlayerSettedVector.y,
            mp.game.gameplay.getGroundZFor3dCoord(lastPlayerSettedVector.x, lastPlayerSettedVector.y, lastPlayerSettedVector.z, 0.0, false)
        );
        return;
    }

    controlModifier = mp.keys.isDown(Keys.VK_RBUTTON);
    shiftModifier = mp.keys.isDown(Keys.VK_LBUTTON);
    var rot = noClipCamera.getRot(2);
    var fastMult = 1;
    var slowMult = 1;
    if (shiftModifier) {
        fastMult = 3;
    } else if (controlModifier) {
        slowMult = 0.2;
    }
    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    var pos = noClipCamera.getCoord();
    var rr = noClipCamera.getDirection();
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult * noClipCameraSpeeds[noClipCameraCurrentSpeedIndex];
    vector.y = rr.y * leftAxisY * fastMult * slowMult * noClipCameraSpeeds[noClipCameraCurrentSpeedIndex];
    vector.z = rr.z * leftAxisY * fastMult * slowMult * noClipCameraSpeeds[noClipCameraCurrentSpeedIndex];
    var upVector = new mp.Vector3(0, 0, 1);
    var rightVector = getCrossProduct(
        getNormalizedVector(rr),
        getNormalizedVector(upVector)
    );
    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;
    var upMovement = 0.0;
    if (mp.keys.isDown(Keys.VK_SPACE)) {
        upMovement = 0.5;
    }
    var downMovement = 0.0;
    if (mp.keys.isDown(Keys.VK_LCONTROL)) {
        downMovement = 0.5;
    }

    localplayer.setCoordsNoOffset(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z - 50, true, true, true);
    localplayer.setHeading(rot.z);
	localplayer.setRotation(0, 0, rot.z, 0, false);
	mp.game.cam.setGameplayCamRelativeHeading(rr.z);

    noClipCamera.setCoord(
        pos.x - vector.x + rightVector.x,
        pos.y - vector.y + rightVector.y,
        pos.z - vector.z + rightVector.z + upMovement - downMovement
    );
    noClipCamera.setRot(
        rot.x + rightAxisY * -5.0,
        0.0,
        rot.z + rightAxisX * -5.0,
        2
    );

    let text = `Camera Speed: x${noClipCameraSpeeds[noClipCameraCurrentSpeedIndex]}\n`;
    text += "[E] - next speed\n";
    text += "[Q] - prev speed"

    mp.game.graphics.drawText(text, [0.05, 0.3], {
        color: [255, 255, 255, 235],
        scale: [2, 0.5],
        outline: true,
        font: 4
    });

    lastPlayerSettedVector = new mp.Vector3(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z - 50);
});

mp.events.add('render', () => {
    if (noClipEnabled && mp.gui.cursor.visible == false) {
        try {
            let noClipEntity = localplayer.isSittingInAnyVehicle() ? localplayer.vehicle : localplayer;

            noClipEntity.freezePosition(true);
            noClipEntity.setInvincible(true);

            mp.game.controls.disableControlAction(0, 8, true);
            mp.game.controls.disableControlAction(0, 9, true);
            mp.game.controls.disableControlAction(0, 22, true);
            mp.game.controls.disableControlAction(0, 30, true);
            mp.game.controls.disableControlAction(0, 31, true);
            mp.game.controls.disableControlAction(0, 32, true);
            mp.game.controls.disableControlAction(0, 33, true);
            mp.game.controls.disableControlAction(0, 34, true);
            mp.game.controls.disableControlAction(0, 35, true);
            mp.game.controls.disableControlAction(0, 36, true);
            mp.game.controls.disableControlAction(0, 63, true);
            mp.game.controls.disableControlAction(0, 64, true);
            mp.game.controls.disableControlAction(0, 71, true);
            mp.game.controls.disableControlAction(0, 72, true);
            mp.game.controls.disableControlAction(0, 77, true);
            mp.game.controls.disableControlAction(0, 78, true);
            mp.game.controls.disableControlAction(0, 78, true);
            mp.game.controls.disableControlAction(0, 87, true);
            mp.game.controls.disableControlAction(0, 88, true);
            mp.game.controls.disableControlAction(0, 89, true);
            mp.game.controls.disableControlAction(0, 90, true);
            mp.game.controls.disableControlAction(0, 129, true);
            mp.game.controls.disableControlAction(0, 130, true);
            mp.game.controls.disableControlAction(0, 133, true);
            mp.game.controls.disableControlAction(0, 134, true);
            mp.game.controls.disableControlAction(0, 136, true);
            mp.game.controls.disableControlAction(0, 139, true);
            mp.game.controls.disableControlAction(0, 142, true);
            mp.game.controls.disableControlAction(0, 146, true);
            mp.game.controls.disableControlAction(0, 147, true);
            mp.game.controls.disableControlAction(0, 148, true);
            mp.game.controls.disableControlAction(0, 149, true);
            mp.game.controls.disableControlAction(0, 150, true);
            mp.game.controls.disableControlAction(0, 151, true);
            mp.game.controls.disableControlAction(0, 232, true);
            mp.game.controls.disableControlAction(0, 266, true);
            mp.game.controls.disableControlAction(0, 267, true);
            mp.game.controls.disableControlAction(0, 268, true);
            mp.game.controls.disableControlAction(0, 269, true);
            mp.game.controls.disableControlAction(0, 278, true);
            mp.game.controls.disableControlAction(0, 279, true);
            mp.game.controls.disableControlAction(0, 338, true);
            mp.game.controls.disableControlAction(0, 339, true);
            mp.game.controls.disableControlAction(0, 44, true);
            mp.game.controls.disableControlAction(0, 20, true);
            mp.game.controls.disableControlAction(0, 47, true);

            let yoff = 0.0;
            let zoff = 0.0;

            if (mp.game.controls.isDisabledControlJustPressed(0, 142)) { //142 LMB
                noClipSpeed++;
                if (noClipSpeed >= noClipSpeedNames.length)
                    noClipSpeed = 0;
            }

            if (mp.game.controls.isDisabledControlPressed(0, 32)) {
                yoff = 0.5;
            }

            if (mp.game.controls.isDisabledControlPressed(0, 33)) {
                yoff = -0.5;
            }

            if (mp.game.controls.isDisabledControlPressed(0, 34)) {
                noClipEntity.setRotation(0, 0, noClipEntity.getRotation(0).z + 3, 0, true);
            }

            if (mp.game.controls.isDisabledControlPressed(0, 35)) {
                noClipEntity.setRotation(0, 0, noClipEntity.getRotation(0).z - 3, 0, true);
            }

            if (mp.game.controls.isDisabledControlPressed(0, 22)) { // SPACE
                zoff = 0.21;
            }

            if (mp.game.controls.isDisabledControlPressed(0, 36)) { // LCTRL
                zoff = -0.21;
            }

            let newPos = noClipEntity.getOffsetFromInWorldCoords(0, yoff * (noClipSpeed * 0.7), zoff * (noClipSpeed * 0.7));
            let heading = noClipEntity.getRotation(0).z;

            noClipEntity.setVelocity(0, 0, 0);
            noClipEntity.setRotation(0, 0, heading, 0, false);
            noClipEntity.setCollision(false, false);
            noClipEntity.setCoordsNoOffset(newPos.x, newPos.y, newPos.z, true, true, true);

            noClipEntity.freezePosition(false);
            noClipEntity.setCollision(true, true);

            // if (adminGodMode == false) {
                // noClipEntity.setInvincible(false);
            // }

            let text = `NoclipSpeed: x${noClipSpeed + 1}/${noClipSpeedNames.length} | ${noClipSpeedNames[noClipSpeed]}\n`;
            text += "[LBM] - next speed";

            mp.game.graphics.drawText(text, [0.065, 0.3], {
                color: [255, 255, 255, 235],
                scale: [2, 0.5],
                outline: true,
                font: 4
            });
        }
        catch (e) {
            debugLog(`NoClip: ${e}`);
        }
    }
});


const NativeUI = require("nativeui");
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const ItemsCollection = NativeUI.ItemsCollection;

let flyItem = new UIMenuCheckboxItem("Free camera", false);
flyItem.eventName = "toggle_fly_camera";
let noclipItem = new UIMenuCheckboxItem("Noclip", false);
noclipItem.eventName = "toggle_noclip";

const pedVisibleCheckbox = new UIMenuCheckboxItem("Visible", true);
const pedAlphaListItem = new UIMenuListItem("Alpha", "", new ItemsCollection(Array.from(new Array(256), (x, i) => i)), 255);

dr.driftMenu.AddItem(flyItem);
dr.driftMenu.AddItem(noclipItem);
dr.driftMenu.AddItem(pedVisibleCheckbox);
dr.driftMenu.AddItem(pedAlphaListItem);

dr.driftMenu.CheckboxChange.on((item, checked) => {

	if (item == flyItem && checked) {
        noclipItem.Checked = false;
		noClip(false);
	}

	if (item == noclipItem && checked) {
        flyItem.Checked = false;
		stopFreeCam(true);
	}

    if (item == pedVisibleCheckbox) {
        mp.players.local.setVisible(checked, false);
    }

	mp.events.call(item.eventName, checked);
});

dr.driftMenu.ListChange.on((item, listIndex) => {
    if (item !== pedAlphaListItem) {
        return;
    }

    mp.players.local.setAlpha(listIndex);
    if (listIndex == 255) {
        mp.players.local.resetAlpha();
    }
});

mp.events.add("toggle_noclip", (enabled) => {
    noClip(enabled);
});

mp.events.add("toggle_fly_camera", (enabled) => {
    if (enabled) {
        startFreeCam();
    } else {
        stopFreeCam(mp.keys.isDown(Keys.VK_LBUTTON));
    }
});

mp.keys.bind(Keys.VK_E, false, function() {
    
    if (noClipCamera) {
        noClipCameraCurrentSpeedIndex++;
        if (noClipCameraCurrentSpeedIndex >= noClipCameraSpeeds.length) {
            noClipCameraCurrentSpeedIndex = 0;
        }
    }
})
mp.keys.bind(Keys.VK_Q, false, function() {
   
    if (noClipCamera) {
        noClipCameraCurrentSpeedIndex--;
        if (noClipCameraCurrentSpeedIndex < 0) {
            noClipCameraCurrentSpeedIndex = noClipCameraSpeeds.length - 1;
        }
    }
})