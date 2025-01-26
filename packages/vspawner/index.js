function xyInFrontOfPos(pos, heading, dist) {
  heading *= Math.PI / 180;
  pos.x += (dist * Math.sin(-heading));
  pos.y += (dist * Math.cos(-heading));
  return pos;
}

function createVehicle(player, modelName) {
  const position = xyInFrontOfPos(player.position, player.heading, 3.0);

  console.log(`[vspawner]: createVehicle: ${modelName}`);

  const vehicle = mp.vehicles.new(mp.joaat(modelName), position, {
    heading: player.heading,
    numberPlate: player.name,
    dimension: player.dimension
  });
  vehicle.owner = player;

  player.allVehicles.push(vehicle.id);
}

mp.events.add("playerJoin", (player) => {
  player.allVehicles = [];
});

mp.events.add("vspawner_Spawn", createVehicle);
mp.events.addCommand("veh", createVehicle);

mp.events.addCommand("vehdel", (player) => {
  const vehicle = player.vehicle;
  if (!vehicle) {
    player.outputChatBox(`Вы должны сидеть в машине`);
    return;
  }

  if (vehicle.owner != player) {
    player.outputChatBox(`Это машина не ваша`);
    return;
  }

  const index = player.allVehicles.indexOf(vehicle.id);
  if (index != -1) {
    player.allVehicles.splice(index, 1);
  }

  vehicle.destroy();
})


mp.events.addCommand("vehdelall", (player) => {
  player.allVehicles.forEach(vehId => {
    const vehicle = mp.vehicles.at(vehId);
    if (vehicle && vehicle.owner == player) {
      vehicle.destroy();
    }
  })
})