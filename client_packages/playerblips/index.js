const Natives = {
    SET_BLIP_CATEGORY: "0x234CDD44D996FD9A",
    SHOW_HEADING_INDICATOR_ON_BLIP: "0x5FBCA48327B914DF"
};

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        let color = parseInt(entity.getVariable("blipColor"));
        if (entity.blip == 0) entity.createBlip(1);

        entity.setBlipColor(isNaN(color) ? 0 : color);
        mp.game.invoke(Natives.SET_BLIP_CATEGORY, entity.blip, 7);
        mp.game.invoke(Natives.SHOW_HEADING_INDICATOR_ON_BLIP, entity.blip, true);
    }
});

mp.events.addDataHandler("blipColor", (entity, value) => {
    if (entity.type === "player") {
        let color = parseInt(value);
        entity.setBlipColor(isNaN(color) ? 0 : color);
    }
});