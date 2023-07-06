// const exec = require('child_process').execFile;
const process = require('process');

let isRestarted = false;

process.on("exit", (code) => {
  console.log("Server app exit with code: " + code)
})

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err)
});

mp.events.addCommand("restart", (player) => {
  if (isRestarted) {
    return;
  }
  isRestarted = true;
  mp.players.broadcast(`!{Red}${player.name} (!{Yellow}${player.socialClub}!{Red}) !{Blue}начал рестарт сервера. Через несколько секунд сервер перезапустится`);
  setTimeout(() => {
    process.exit(`${player.socialClub} restarted server`);
  }, 2_500)
});