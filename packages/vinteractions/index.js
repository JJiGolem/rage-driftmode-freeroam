mp.events.add({
    'entityCreated' : (entity) => {
        if(entity.type == 'vehicle') {
            entity.doors = [0,0,0,0,0,0,0]
        }
    },
    'server.vehicles.sync.doors' : (player, vehicle, doors) => {
        vehicle.doors = JSON.parse(doors);
        player.call('client.vehicles.sync.doors', [vehicle, JSON.stringify(vehicle.doors)]);
        mp.players.callInRange(player.position, 500, 'client.vehicles.sync.doors', [vehicle, JSON.stringify(vehicle.doors)]);
    },
    'server.vehicles.get.sync.doors' : (player, vehicle) => {
        if(typeof vehicle.doors == 'object') {
            player.call('client.vehicles.sync.doors', [vehicle, JSON.stringify(vehicle.doors)]);
        }
    }
})