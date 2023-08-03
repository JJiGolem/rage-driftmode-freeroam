const fs = require('fs');
const fileName = "save_positions.txt";

mp.events.addCommand("savepos", (player, description) => {
  if (!description) {
    player.outputChatBox("/savepos [description]");
    return;
  }

  const {x, y, z} = player.position;
  const {rx, ry, rz} = player.rotation;
  const data = `${player.name}| ${description}: pos= new mp.Vector3(${x, y, z}), rot= new mp.Vector3(${rx, ry, rz})`;

  fs.appendFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
      player.outputChatBox("SavePosition Error: " + err);
    }
  })
})