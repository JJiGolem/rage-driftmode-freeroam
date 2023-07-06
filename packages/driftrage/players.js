let fs = require("fs");
let crypto = require('crypto');

function md5(text) 
{
	return crypto.createHash('md5').update(text).digest('hex');
}

function setNewAccount(player)
{
	player.stats = 
	{
		creationDate: Date.now(),
		socialClub: md5(player.socialClub),
		serial: md5(player.serial),
		driftScore: 0,
		lastPosition: [0,0,73],
		outfit: 1
	};
	
	player.newAccount = true;
}

mp.events.add("playerReady", (player) =>
{
	let playerId = md5(`${player.socialClub}_${player.serial}`);
	
	fs.readFile(`epicdb/users/${playerId}.json`, (err, data) => 
	{
	  if (err)
	  {
		  setNewAccount(player);
	  }
	  else
	  {
		  try
		  {
			player.stats = JSON.parse(data);
		  }
		  catch(e)
		  {
			setNewAccount(player);
		  }
	  }
	  
		player.spawn(player.stats.lastPosition);
		player.setOutfit(1);
		
		player.call("loadXPData", [player.stats.driftScore >> 0]);
		
		if(player.newAccount)
		{
			player.position = player.stats.lastPosition;
			
			player.defaultCharacter();
			player.sendToCreator();
		}
		else
		{
			player.applyCharacter();
			player.outputChatBox("You've been spawned at your latest known position");
		}
	});	
});

// player should not die normally though?
mp.events.add("playerDeath", (player) =>
{
	player.spawn(player.stats.lastPosition);
	player.outputChatBox("You've been spawned at your latest known position");
});

mp.events.add("playerChat", (player, chat) =>
{
	mp.players.broadcast(`${player.name} (${player.id}): ${chat}`);
});

mp.events.add("updateXPData", (player, data) =>
{
	player.stats.driftScore = data;
});

mp.events.add("playerQuit", (player) =>
{
	if(player.stats)
	{
		let playerId = md5(`${player.socialClub}_${player.serial}`);
		
		player.stats.lastPosition = player.position;
		player.stats.outfit = player.outfit;
		
		fs.writeFile(`epicdb/users/${playerId}.json`,
			JSON.stringify(player.stats), (err) => 
		{
			if (err)
			{
				console.log(JSON.stringify(err));
			}
		});
	}
});

function savePlayers()
{
	mp.players.forEach((player) =>
	{
		if(player.stats)
		{
			let playerId = md5(`${player.socialClub}_${player.serial}`);
			
			player.stats.lastPosition = player.position;
			player.stats.outfit = player.outfit;
			
			fs.writeFile(`epicdb/users/${playerId}.json`,
				JSON.stringify(player.stats), (err) => 
			{
				if (err)
				{
					console.log(JSON.stringify(err));
				}
			});
		}		
	});
}

setInterval(() => savePlayers, 10_000);

mp.events.add("updateDriftScore", (player, score) =>
{
	player.stats.driftScore = parseInt(score, 36);
});