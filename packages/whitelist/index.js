const fs = require("fs");

const whitelist = [];

function loadWhiteList() {
  fs.readFile(`epicdb/whitelist.json`, (err, data) => 
  {
    if (err) {
      console.log(err);
      return;
    }

    try {
        const socialClubsList = JSON.parse(data);
        for (const index in socialClubsList) {
          const socialClub = socialClubsList[index];
          whitelist.push(socialClub)
          console.log("Whitelist add socialClub: " + socialClub);
        }
      } catch (error) {
        console.log(`Error load whitelist: ${JSON.stringify(error)}`);
      }
  });
}

function saveWhiteList() {
  fs.writeFile(`epicdb/whitelist.json`, JSON.stringify(whitelist), (err) => 
  {
    if (err) {
      console.log(err);
      return;
    }
  });
}

mp.events.add("playerJoin", (player) => {
  const socialClub = player.socialClub;
  if (!whitelist.includes(socialClub)) {
    player.kick(`Ваш аккаунт socialclub не находится в белом списке (${socialClub})`);
    console.log(`Игрок ${player.name} был кикнут с сервера, так как не находится в белом списке: ${socialClub}`);
    mp.players.broadcast(`!{Yellow}${player.socialClub} !{Gray}попытался зайти на сервер..`);
  }
})

mp.events.addCommand("addwhite", (player, socialClub) => {
  if (!socialClub) {
    player.outputChatBox("/addwhite [socialClub]");
    return;
  }

  if (whitelist.includes(socialClub)) {
    player.outputChatBox("Данный socialClub уже находится в белом списке");
    return;
  }

  whitelist.push(socialClub);
  saveWhiteList();
})

mp.events.addCommand("delwhite", (player, socialClub) => {
  if (!socialClub) {
    player.outputChatBox("/delwhite [socialClub]");
    return;
  }

  const index = whitelist.indexOf(socialClub);
  if (index == -1) {
    player.outputChatBox("Данный socialClub не находился в белом списке");
    return;
  }

  whitelist.splice(index, 1);
  saveWhiteList();
})

loadWhiteList();