function xyInFrontOfPos(vector2, angle, distance) {
    // angle *= Math.PI / 180;
    const radians = angle * Math.PI / 180;
    vector2.x += (distance * Math.sin(-radians));
    vector2.y += (distance * Math.cos(-radians));
    return vector2;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

exports = {
    xyInFrontOfPos,
    clamp
}