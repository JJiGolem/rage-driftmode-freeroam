const { clamp } = require("./utils/math");

const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

const player = mp.players.local;

const mainMenu = new Menu("Camera", "Rotator test", new Point(1250, 150));
const mainMenuItem = new UIMenuItem("Camera");

dr.driftMenu.BindMenuToItem(mainMenu, mainMenuItem);

const cameraStartMenuItem = new UIMenuItem("start test");
const cameraStopMenuItem = new UIMenuItem("stop test");

mainMenu.AddItem(cameraStartMenuItem);
mainMenu.AddItem(cameraStopMenuItem);

mainMenu.ItemSelect.on((item, index) => {
    if (item === cameraStartMenuItem) {
        mp.gui.cursor.visible = true;
        const camera = mp.cameras.new("default");
        camera.setCoord(player.position.x, player.position.y, player.position.z);
        camera.setRot(0, 0, 0, 2);
        camera.setFov(75);
        camera.pointAtCoord(player.position.x, player.position.y, player.position.z);

        mp.game.cam.renderScriptCams(true, false, 3000, true, false);
        cameraRotator.start(camera, player.position.clone(), player.position.clone(), new mp.Vector3(3, 0, 1), player.getHeading());
        cameraRotator.setZBound(-1.2, 1.8);
        cameraRotator.setZUpMultipler(3);
        cameraRotator.rangeMultiplier = 3;
    }

    if (item === cameraStopMenuItem) {
        mp.gui.cursor.visible = false;
        cameraRotator.stop();
        if (cameraRotator.camera) {
            cameraRotator.camera.destroy();
            cameraRotator.camera = null;
          }
      
          mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
});

class CameraRotator {
	start(camera, basePosition, lookAtPosition, offsetVector, heading, fov = undefined) {
		this.camera = camera;
		this.basePosition = basePosition;
		this.lookAtPosition = lookAtPosition;
		this.offsetVector = offsetVector;
		this.heading = heading;
		this.baseHeading = heading;
		this.currentPoint = { x: 0, y: 0 };
		this.isPause = false;
		this.zUp = 0;
		this.zUpMultipler = 1;
		this.xBound = [ 0, 0 ];
		this.zBound = [ -0.01, 0.8 ];

        this.rangeTemp = 1;
        this.rangeMultiplier = 1;
        this.rangeBound = [ 0.25, 1.2 ];

		this.changePosition();

		camera.pointAtCoord(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);

		if (fov) {
			camera.setFov(fov);
		}

		this.activate(true);
	}

	pause(state) {
		this.isPause = state;
	}

	stop() {
		this.activate(false);
	}

	reset() {
		this.heading = this.baseHeading;
		this.zUp = 0;
		this.changePosition();
	}

	setXBound(min, max) {
		this.xBound = [ min, max ];
	}

	setZBound(min, max) {
		this.zBound = [ min, max ];
	}

	setZUpMultipler(value) {
		this.zUpMultipler = value;
	}

	getRelativeHeading() {
		return this.normilizeHeading(this.baseHeading - this.heading);
	}

	activate(state) {
		/* this.camera.setActive(state);
		mp.game.cam.renderScriptCams(state, false, 3000, true, false); */
		this.isActive = state;
	}

	onMouseMove(dX, dY) {
		this.heading = this.normilizeHeading(this.heading + dX * 100);

		let relativeHeading = this.getRelativeHeading();

		if (relativeHeading > this.xBound[0] && relativeHeading < this.xBound[1]) {
			relativeHeading = Math.abs(this.xBound[0] - relativeHeading) > Math.abs(this.xBound[1] - relativeHeading) 
				? this.xBound[1]
				: this.xBound[0];
		}

		this.heading = this.normilizeHeading(-relativeHeading + this.baseHeading);
		this.zUp += dY * this.zUpMultipler * -1;

		if (this.zUp > this.zBound[1]) {
			this.zUp = this.zBound[1];
		} else if (this.zUp < this.zBound[0]) {
			this.zUp = this.zBound[0];
		}

		this.changePosition();
	}

	onMouseScroll(up, down) {
		if (this.camera == null) return;
		if (up == 0 && down == 0) return;
	
		const dZ = (up - down) * this.rangeMultiplier;
		this.rangeTemp += 0.01 * dZ;
        this.rangeTemp = clamp(this.rangeTemp, this.rangeBound[0], this.rangeBound[1]);
		this.changePosition();
	  }

	changePosition() {
		const position = mp.game.object.getObjectOffsetFromCoords(this.basePosition.x, this.basePosition.y,
			this.basePosition.z + this.zUp, this.heading, this.offsetVector.x * this.rangeTemp, this.offsetVector.y, this.offsetVector.z);
		
		this.camera.setCoord(position.x, position.y, position.z);
	}

	isPointEmpty() {
		return this.currentPoint.x === 0 && this.currentPoint.y === 0;
	}

	setPoint(x, y) {
		this.currentPoint = { x, y };
	}

	getPoint() {
		return this.currentPoint;
	}

	normilizeHeading(heading) {
		if (heading > 360) {
			heading = heading - 360;
		} else if (heading < 0) {
			heading = 360 + heading;
		}

		return heading;
	}
}

const cameraRotator = new CameraRotator();

mp.events.add("render", () => {
	if (!mp.gui.cursor.visible || !cameraRotator.isActive || cameraRotator.isPause) {
		return;
	}

	const x = mp.game.controls.getDisabledControlNormal(2, 239);
	const y = mp.game.controls.getDisabledControlNormal(2, 240);

	const scrollUp = mp.game.controls.getDisabledControlNormal(2, 241);
  	const scrollDown = mp.game.controls.getDisabledControlNormal(2, 242);

	if (cameraRotator.isPointEmpty()) {
		cameraRotator.setPoint(x, y);
	}

	const currentPoint = cameraRotator.getPoint();
	const dX = currentPoint.x - x;
	const dY = currentPoint.y - y;
	
	cameraRotator.setPoint(x, y);
	cameraRotator.onMouseScroll(scrollUp, scrollDown);

	// Comment before commit
	drawDebugText();

	if (mp.game.controls.isDisabledControlPressed(2, 237)) {
		cameraRotator.onMouseMove(dX, dY);
	}
});

const drawDebugText=function() {
	let message = `zUp: ${cameraRotator.zUp.toFixed(3)}`;

	message += `\nrange: ${cameraRotator.rangeTemp.toFixed(5)}`;
	message += `\nrangeWithOffsetX: ${cameraRotator.offsetVector.x * cameraRotator.rangeTemp}`;
	message += `\nHeading: ${cameraRotator.heading.toFixed(2)}`;
	message += `\nBase Heading: ${cameraRotator.baseHeading.toFixed(2)}`;
	message += `\nRelative Heading: ${cameraRotator.getRelativeHeading().toFixed(2)}`;

	mp.game.graphics.drawText(message, [0.5, 0.005], { 
		font: 7, 
		color: [255, 255, 255, 185], 
		scale: [0.8, 0.8], 
		outline: true,
		centre: true
	});
}