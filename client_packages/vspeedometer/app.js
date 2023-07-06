const rpmNeedle = document.getElementById('needle');
const speedValue = document.getElementById('speedValue');


const rpmDegMin = -117;
const rpmDegMax = 117;
const maxRpm = 10000;

function roundTo(value,round){
    return (round * Math.floor(value / 25))
}

function calculateRpmAngle(rpm){
    rpm = roundTo(rpm*maxRpm,25);
    let angleRange = Math.abs(rpmDegMin - rpmDegMax);
    let rotation = rpmDegMin + ((rpm/maxRpm) * angleRange); 
    if(rpm >= 9400) 
    {
        jitter = Math.random()*30;
        if(Math.random() < 0.5){
            jitter = -jitter;
        }
        rotation = rotation + jitter;
    }
    return rotation
}

function setRPMValue(rpm){
    rot = calculateRpmAngle(rpm);
    rpmNeedle.style.transform="rotate("+rot+"deg)";
    return;
}

function setSpeedValue(value){
    speedValue.innerHTML = (parseInt(value)).toString();
}