let consts = require("driftrage/configs/drifting_json.js");

// utils
function fromDegree(angle) { return angle / (180.0 / Math.PI); }
function toDegree(angle) { return angle * (180.0 / Math.PI); }

function normalize2d(x, y)
{
	let t = mp.game.system.sqrt(x*x + y*y);

	if (t > 0.000001)
	{
		let fRcpt = 1 / t;

		x *= fRcpt;
		y *= fRcpt;
	}
	
	return [x, y];
}

let driftMngr =
{	
	isDrifting: false,
	
	startSnapshot:
	{
		health: 1000.0
	},
	
	badAngleSince: 0,
	
	slippery: false,
	slippedyIdx: 0,
	
	api:
	[
		[],	// start
		[],	// end
		[]	// process
	],
	
	onDriftStarted: function(vehicle, health)
	{
		this.startSnapshot.health = health;
		this.startSnapshot.startTime = Date.now();
		this.isDrifting = true;
		
		if(this.api[0].length > 0)
		{
			for(let cb of this.api[0])
			{
				cb();
			}
		}
	},
	
	onDriftEnded: function(reason)
	{
		this.isDrifting = false;
		
		if(this.api[1].length > 0)
		{
			for(let cb of this.api[1])
			{
				cb(reason);
			}
		}
	},
	
	onDriftProcessed: function(angle, speed, active, stopProgress)
	{
		if(this.api[2].length > 0)
		{
			for(let cb of this.api[2])
			{
				cb(angle, speed, active, stopProgress);
			}
		}
	},
	
	pulse: function()
	{
		let vehicle = mp.players.local.vehicle;
		
		if(vehicle)
		{
			let velocity = vehicle.getVelocity();
			let speed = vehicle.getSpeed();
			
			let health = vehicle.getBodyHealth();
			
			///
			let fv = vehicle.getForwardVector();
			let fvn = normalize2d(fv.x, fv.y);
			let fvvn = normalize2d(velocity.x, velocity.y);
			
			driftAngle = mp.game.gameplay.getAngleBetween2dVectors(fvn[0], fvn[1], fvvn[0], fvvn[1]);
			
			let angleOk = (driftAngle >= consts.MinAngle && driftAngle <= consts.MaxAngle);
			let speedOk = (speed >= consts.MinSpeed);
			let damageOk = this.isDrifting ? (health >= this.startSnapshot.health) : true;
			
			let isDriftingNow = (angleOk && speedOk && damageOk);
			
			if(this.isDrifting)
            { 
				if(isDriftingNow)
				{
					this.badAngleSince = 0;
					this.onDriftProcessed(driftAngle, speed, true);
				}
				else
				{
					let end = true;
					
					if(!angleOk && speedOk && damageOk)
					{
						if(this.badAngleSince === 0)
						{
							this.badAngleSince = Date.now();
							end = false;
						}
						else if((Date.now() - this.badAngleSince) < 2000)
						{
							end = false;
						}
					}
					
					if(end)
					{
						this.onDriftEnded(!angleOk ? consts.DriftEndReason.LowAngle : (!speedOk ? consts.DriftEndReason.LowSpeed : consts.DriftEndReason.DamageDetected));						
						vehicle.setReduceGrip(false);
						
					}
					else
					{
						this.onDriftProcessed(driftAngle, speed, false, ((Date.now() - this.badAngleSince) / 2000));

					}
				}
			}
			else if(isDriftingNow)
			{
				this.onDriftStarted(vehicle, health);
			}
		}
		else if(this.isDrifting)
		{
			this.onDriftEnded(consts.DriftEndReason.OutOfVehicle);
		}
	},
	
	pulseDrift: function()
	{
		if(this.isDrifting)
		{
			let vehicle = mp.players.local.vehicle;
			
			if(vehicle)
			{
				this.slippedyIdx++;
				
				if(this.slippedyIdx === 3)
				{
					this.slippedyIdx = 0;
					vehicle.setReduceGrip(true);
				}
				else
				{
					vehicle.setReduceGrip(false);
				}
			}
		}
	},
	
	addCallback: function(cb, type)
	{
		if(typeof(type) === 'number' && type >= 0 && type <= 2)
		{
			let api = this.api[type];
			
			if(api.indexOf(cb) === -1)
			{
				api.push(cb);
			}
		}
	}
};

mp.events.add("addDriftHandler", (cb, type) =>
{
	driftMngr.addCallback(cb, type);
});

dr.driftMngr = driftMngr;