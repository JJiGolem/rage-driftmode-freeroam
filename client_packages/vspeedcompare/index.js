let gcc = mp.browsers.new("package://vspeedcompare/index.html");
let visible = false;
let player = mp.players.local;
let currentSpeed = currentTime = time0To100 = time0To200 = vmax = startTime = 0;
let modify0To100 = modify0To200 = modifyCurrentTime = true;

mp.events.add('render', () =>{
	if(player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle){
		if(visible === false){
			gcc.execute("showUI();");
			visible = true;
		}
        currentSpeed = ((player.vehicle.getSpeed() * 3.6).toFixed(0)*1);
        if(currentSpeed == 0){
            currentTime = time0To100 = time0To200 = vmax = startTime = 0;
            modify0To100 = modify0To200 = modifyCurrentTime = true;
        }else{
            if(currentSpeed > vmax) vmax = currentSpeed;
            if(startTime == 0) startTime = new Date().getTime();
            if(modifyCurrentTime) currentTime = ((new Date().getTime() - startTime) / 1000).toFixed(3);
            if(modify0To100) time0To100 = currentTime;
            if(currentSpeed >= 100) modify0To100 = false;
            if(modify0To200) time0To200 = currentTime;
            if(currentSpeed >= 200){
                modify0To200 = false;
                modifyCurrentTime = false;
            }
        }
		gcc.execute(`updateUI(${time0To100},${time0To200},${vmax});`);
	}else{
		if(visible){
			gcc.execute("hideUI();");
			visible = false;
		}
	}
});