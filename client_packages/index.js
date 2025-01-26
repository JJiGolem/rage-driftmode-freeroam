
// Коды клавиш
require("./utils/keys");
// Библиотека для отображение баров
require("timerbars");

// Ядро мода
require("driftrage");

// Одежда игрока
require("./playerClothes");
// Список игроков
require("./playerlist");
// Блипы игроков на карте
require("playerblips");
// Отображение местоположения у карты
require("./playerlocation");
// Редактор персонажа
require("charcreator");

// Скрипт полета
require("./utils/fly");

// Спавнер машина
require("vspawner");
// Тюнинг машин
require("vtuning");
// Скрипт для отображения информации об авто
require("./vinfo");
// Индикаторы поворотников транспорта
require("./vindicators");
// Взаимодействия с элементами транспорта (дверь, капот, багажник)
require("./vinteractions");
// Спидометр
require("./vspeedometer");
// Счетчик разгона машины
require("./vspeedcompare");
// Менеджер управления авто
require("./vmanager");
// Настройки машины
require("./vsettings");
// Сиденья
require("./vseats");

// Настройки игрового мира
require("./world");

require("./rage-builder");

require("./blipCreator");

require("./locations");

// require("./addons");

require("./camera");

// mp.events.add("render", async () => {
//     if (wheelsPool.length > 0 && !lockWheelsPool) {
//         const elem = wheelsPool.shift();
//         await elem.handler();
//         await mp.game.waitAsync(50);
//     }

//     if (doorsPool.length > 0 && !lockDoorsPool) {
//         const elem = doorsPool.shift();
//         await elem.handler();
//         await mp.game.waitAsync(50);
//     }

//     if (bumpersPool.length > 0 && !lockBumpersPool) {
//         const elem = bumpersPool.shift();
//         await elem.handler();
//         await mp.game.waitAsync(50);
//     }
// })

setInterval(async () => {
    if (bumpersPool.length > 0 && !lockBumpersPool) {

        const now = new Date();
        const hasOldElement = bumpersPool.some(elem => now - elem.date >= 100);
        if (!hasOldElement) {
            return;
        }

        bumpersPool.sort((a, b) => a.date - b.date);
        const elem = bumpersPool.shift();
        await elem.handler();
    }
}, 100);

const wheelsPool = [];
const doorsPool = [];
const bumpersPool = [];

let lockWheelsPool = false;
let lockDoorsPool = false;
let lockBumpersPool = false;

mp.events.add("entityStreamIn", async (entity) => {
    if (!entity || entity.type != "vehicle") {
        return;
    }

    for (let i = 0; i < 1000 && entity.handle == 0; i++) {
        await mp.game.waitAsync(50);
    }

    if (!entity.handle) {
        mp.console.logError(`handleWheels: entity.handle is zero`);
        return;
    }

    entity.setLoadCollisionFlag(true);

    // mp.game.vehicle.setModelIsSuppressed(entity.model, true);
    // entity.removeHighDetailModel();

    await handleWheels(entity, false);
    await handleDoors(entity, false);
    //await handleBumpers(entity, false);
    // return;

    // lockWheelsPool = true;
    // if (!wheelsPool.some(x => x.handle == entity.handle)) {
    //     wheelsPool.push({
    //         handle: entity.handle,
    //         handler: () => handleWheels(entity, false)
    //     });
    // }
    // lockWheelsPool = false;

    // lockDoorsPool = true;
    // if (!doorsPool.some(x => x.handle == entity.handle)) {
    //     doorsPool.push({
    //         handle: entity.handle,
    //         handler: () => handleDoors(entity, false)
    //     });
    // }
    // lockDoorsPool = false;

    lockBumpersPool = true;
    if (!bumpersPool.some(x => x.handle == entity.handle)) {
        bumpersPool.push({
            handle: entity.handle,
            handler: () => handleBumpers(entity, false),
            date: new Date()
        });
    }
    lockBumpersPool = false;
})

mp.events.add("entityStreamOut", async (entity) => {
    if (!entity || entity.type != "vehicle") {
        return;
    }

    for (let i = 0; i < 1000 && entity.handle == 0; i++) {
        await mp.game.waitAsync(50);
    }

    if (!entity.handle) {
        mp.console.logError(`handleWheels: entity.handle is zero`);
        return;
    }

    // mp.game.streaming.setModelAsNoLongerNeeded(entity.model);
    // return;

    // lockWheelsPool = true;
    // const index1 = wheelsPool.findIndex(x => x.handle == entity.handle);
    // if (index1 > -1) {
    //     wheelsPool.splice(index1, 1);
    // }
    // lockWheelsPool = false;

    // lockDoorsPool = true;
    // const index2 = doorsPool.findIndex(x => x.handle == entity.handle);
    // if (index2 > -1) {
    //     doorsPool.splice(index2, 1);
    // }
    // lockDoorsPool = false;

    lockBumpersPool = true;
    const index3 = bumpersPool.findIndex(x => x.handle == entity.handle);
    if (index3 > -1) {
        bumpersPool.splice(index3, 1);
    }
    lockBumpersPool = false;
})

const wheelIds = Object.freeze([0, 1, 4, 5]);
const doorBones = Object.freeze(['door_dside_f', 'door_pside_f', 'door_dside_r', 'door_pside_r']);
const bumperBones = Object.freeze(["bumper_f", "bumper_r"]);

async function handleWheels(entity, haveWheels) {
    if (!entity || !mp.vehicles.exists(entity)) {
        return;
    }

    for (let i = 0; i < 1000 && entity.handle == 0; i++) {
        await mp.game.waitAsync(50);
    }

    if (!entity.handle) {
        mp.console.logError(`handleWheels: entity.handle is zero`);
        return;
    }

    if (haveWheels) {
        for (const wheelId of wheelIds) {
            if (!entity || !mp.vehicles.exists(entity) || !entity.handle) {
                return;
            }

            entity.setTyreFixed(wheelId);
        }

        return;
    }

    for (const wheelId of wheelIds) {
        if (!entity || !mp.vehicles.exists(entity) || !entity.handle) {
            return;
        }

        for (
            let i = 0;
            i < 1000 && mp.game.vehicle.isTyreBurst(entity.handle, wheelId, true) == false;
            i++
        ) {

            if (!entity || !mp.vehicles.exists(entity) || !entity.handle) {
                return;
            }

            entity.setTyreBurst(wheelId, true, 0x447a0000);
            await mp.game.waitAsync(50);
        }
    }

    if (!haveWheels)
    {
        for(let i = 0; i < entity.wheelCount; i++)
        {
            entity.breakOffWheel(i, true);
        }
    }
    else
    {
        for(let i = 0; i < entity.wheelCount; i++)
        {
            entity.fixWheel(i);
        }
    }
    
}

async function handleDoors(entity, haveDoors) {
    if (!entity || !mp.vehicles.exists(entity)) {
        return;
    }
    
    //mp.console.logInfo(`handleDoors 1 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && entity.handle == 0; i++) {
        await mp.game.waitAsync(50);
    }

    //mp.console.logInfo(`handleDoors 2 (${entity.model})`, true, true);

    if (!entity.handle) {
        //mp.console.logError(`handleDoors: entity.handle is zero`);
        return;
    }

    //mp.console.logInfo(`handleDoors 3 (${entity.model})`, true, true);

    if (!mp.game.streaming.isModelValid(entity.model) || !mp.game.streaming.isModelAVehicle(entity.model)) {
        //mp.console.logError(`handleDoors: not valid model at vehicle: ${entity.model}`);
        return;
    }

    //mp.console.logInfo(`handleDoors 4 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && !mp.game.streaming.hasModelLoaded(entity.model); i++) {
        //mp.console.logInfo(`handleDoors 4 (${entity.model}) model requested`, true, true);
        mp.game.streaming.requestModel(entity.model);
        await mp.game.waitAsync(100);
    }

    //mp.console.logInfo(`handleDoors 5 (${entity.model})`, true, true);

    //const { x, y, z } = entity.position;
    //mp.game.streaming.requestCollisionAtCoord(x, y, z);

    //mp.console.logInfo(`handleDoors 6 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && !mp.game.streaming.hasCollisionForModelLoaded(entity.model); i++) {
        //mp.console.logInfo(`handleDoors 6 (${entity.model}) collision for model requested`, true, true);
        mp.game.streaming.requestCollisionForModel(entity.model);
        await mp.game.waitAsync(100);
    }

    //mp.console.logInfo(`handleDoors 7 (${entity.model})`, true, true);

    if (haveDoors) {
        entity.setFixed();
        return;
    }

    entity.deleteBrokenPartObjects = true;

    for (let i = 0; i < doorBones.length; i++)
    {
        if (!entity || !mp.vehicles.exists(entity) || !entity.handle) {
            return;
        }

        if (entity.getBoneIndexByName(doorBones[i]) === -1) {
            //mp.console.logInfo(`Door at index: ${i} not have bone for entity: ${entity.handle}`);
            continue;
        }

        if (mp.game.vehicle.getIsDoorValid(entity.handle, i) == false) {
            //mp.console.logInfo(`Door at index: ${i} not valid for entity: ${entity.handle}`);
            continue;
        }
        
        if (entity.isDoorDamaged(i)) {
            //mp.console.logInfo(`Door at index: ${i} already broken for entity: ${entity.handle}`);
            continue;
        }
        entity.setDoorBreakable(i, true);
        entity.setDoorBroken(i, true);

        //mp.console.logInfo(`handleDoors 8 (door: ${i}) (${entity.model})`, true, true);

        await mp.game.waitAsync(50);
    }

    //mp.console.logInfo(`handleDoors 9 (${entity.model})`, true, true);
}

async function handleBumpers(entity, haveBumpers) {
    if (!entity || !mp.vehicles.exists(entity)) {
        return;
    }
    
    //mp.console.logInfo(`handleBumpers 1 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && entity.handle == 0; i++) {
        await mp.game.waitAsync(50);
    }

    //mp.console.logInfo(`handleBumpers 2 (${entity.model})`, true, true);

    if (!entity.handle) {
        mp.console.logError(`handleBumpers: entity.handle is zero`);
        return;
    }

    //mp.console.logInfo(`handleBumpers 3 (${entity.model})`, true, true);

    if (!mp.game.streaming.isModelValid(entity.model) || !mp.game.streaming.isModelAVehicle(entity.model)) {
        mp.console.logError(`handleBumpers: not valid model at vehicle: ${entity.model}`);
        return;
    }

    //mp.console.logInfo(`handleBumpers 4 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && !mp.game.streaming.hasModelLoaded(entity.model); i++) {
        //mp.console.logInfo(`handleBumpers 4 (${entity.model}) model requested`, true, true);
        mp.game.streaming.requestModel(entity.model);
        await mp.game.waitAsync(100);
    }

    //mp.console.logInfo(`handleBumpers 5 (${entity.model})`, true, true);

    //const { x, y, z } = entity.position;
    //mp.game.streaming.requestCollisionAtCoord(x, y, z);

    //mp.console.logInfo(`handleBumpers 6 (${entity.model})`, true, true);

    for (let i = 0; i < 1000 && !mp.game.streaming.hasCollisionForModelLoaded(entity.model); i++) {
        //mp.console.logInfo(`handleBumpers 6 (${entity.model}) collision for model requested`, true, true);
        mp.game.streaming.requestCollisionForModel(entity.model);
        await mp.game.waitAsync(100);
    }

    for (let i = 0; i < 1000 && !entity.hasCollisionLoadedAround(); i++) {
        mp.console.logInfo(`${entity.model} -> hasCollisionLoadedAround`);
        await mp.game.waitAsync(100);
    }

    for (let i = 0; i < 1000 && entity.isWaitingForWorldCollision(); i++) {
        mp.console.logInfo(`${entity.model} -> isWaitingForWorldCollision`);
        await mp.game.waitAsync(100);
    }

    for (let i = 0; i < 1000 && !entity.doesHaveDrawable(); i++) {
        mp.console.logInfo(`${entity.model} -> doesHaveDrawable`);
        await mp.game.waitAsync(100);
    }

    for (let i = 0; i < 1000 && !entity.doesHavePhysics(); i++) {
        mp.console.logInfo(`${entity.model} -> doesHavePhysics`);
        await mp.game.waitAsync(100);
    }

    //mp.console.logInfo(`handleBumpers 7 (${entity.model})`, true, true);

    if (haveBumpers) {
        entity.fixBumper(false);
        entity.fixBumper(true);
        return;
    }

    entity.deleteBrokenPartObjects = true;

    //mp.console.logInfo(`handleBumpers 8 (${entity.model})`, true, true);

    await mp.game.waitAsync(500);

    for (const bumper of bumperBones) {
        const isFront = bumper == "bumper_f";

        //mp.console.logInfo(`handleBumpers 9 (${bumper}) (${entity.model})`, true, true);

        if (!entity || !mp.vehicles.exists(entity) || !entity.handle) {
            return;
        }

        //mp.console.logInfo(`handleBumpers 10 (${bumper}) (${entity.model})`, true, true);

        if (entity.getBoneIndexByName(bumper) == -1) {
            continue;
        }

        //mp.console.logInfo(`handleBumpers 11 (${bumper}) (${entity.model})`, true, true);

        if (entity.isBumperBrokenOff(isFront)) {
            continue;
        }

        //mp.console.logInfo(`handleBumpers 12 (${bumper}) (${entity.model})`, true, true);
        
        if (!entity.hasCollisionLoadedAround()) {
            mp.console.logInfo(`For ${entity.model} -> hasCollisionLoadedAround`);
            continue;
        }

        if (entity.isWaitingForWorldCollision()) {
            mp.console.logInfo(`For ${entity.model} -> isWaitingForWorldCollision`);
            continue;
        }

        if (!entity.doesHaveDrawable()) {
            mp.console.logInfo(`For ${entity.model} -> doesHaveDrawable`);
            continue;
        }

        if (!entity.doesHavePhysics()) {
            mp.console.logInfo(`For ${entity.model} -> doesHavePhysics`);
            continue;
        }

        // entity.fixBumper(isFront);

        // entity.setMod(isFront ? 1 : 2, -1);

        entity.breakOffBumper(isFront, false); // true

        // mp.game.streaming.forceStreamingUpdate();

        await mp.game.waitAsync(100);
    }

    //mp.console.logInfo(`handleBumpers 13 (${entity.model})`, true, true);
}