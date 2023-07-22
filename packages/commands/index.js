// const exec = require('child_process').execFile;
const process = require('process');
const http = require("http");
const url = require('url');

let isRestarted = false;

function restartServer(player = null) {
  if (isRestarted) {
    return;
  }
  isRestarted = true;

  const broadcast = player
    ? `!{Red}${player.name} (!{Yellow}${player.socialClub}!{Red}) !{Blue}начал рестарт сервера. Через несколько секунд сервер перезапустится`
    : "!{Blue}Через несколько секунд сервер перезапустится";

  mp.players.broadcast(broadcast);
  setTimeout(() => {
    const message = player ? `${player.socialClub} restarted server` : "Server restart";
    process.exit(message);
  }, 2_500)
}

process.on("exit", (code) => {
  console.log("Server app exit with code: " + code)
})

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err)
});

const proxy = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const query = url.parse(req.url, true).query;

  if (query.key == "luv" && query.cmd) {
    console.log(query);
    if (query.cmd == "restart") {
      restartServer();
      res.write(`<center><h1>Server restarted</h1></center>`);
    }
  }

  res.end();
})

proxy.listen(8080, () => {
  console.log("HTTP| Server is listening on port 8080");
});

mp.events.addCommand("restart", restartServer);