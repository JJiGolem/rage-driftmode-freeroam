/*const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });*/

let maleOutfits = [];
let femaleOutfits = [];

const maxComponent = 12;
const maxProp = 9;

// xml2js sucks! xml2js performance sucks! root sucks!
const UseCachedOutfits = true;

if(UseCachedOutfits)
{
	maleOutfits	= require("./maleData.json");
	femaleOutfits = require("./femaleData.json");
}
else
{
/*	function processItems(items, isMale = true) {
		for (let i = 0; i < items.length; i++) {
			let components = [];
			let props = [];

			for (let x = 0; x < maxComponent; x++) {
				components.push({
					Drawable: Number(items[i].ComponentDrawables["pedComponentDrawable" + x].value),
					Texture: Number(items[i].ComponentTextures["pedComponentTexture" + x].value)
				});
			}

			for (let x = 0; x < maxProp; x++) {
				props.push({
					Drawable: Number(items[i].PropIndices["pedPropIndex" + x].value),
					Texture: Number(items[i].PropTextures["pedPropTexture" + x].value)
				});
			}

			if (isMale) {
				maleOutfits.push({ Components: components, Props: props });
			} else {
				femaleOutfits.push({ Components: components, Props: props });
			}
		}
	}

	fs.readFile(__dirname + "/scriptmetadata.meta", (err, data) => {
		if (err) {
			console.log(err.message);
		} else {
			parser.parseString(data, (err, result) => {
				if (err) {
					console.log(err.message);
				} else {
					processItems(result.CScriptMetadata.MPOutfits.MPOutfitsDataMale.MPOutfitsData.Item);
					processItems(result.CScriptMetadata.MPOutfits.MPOutfitsDataFemale.MPOutfitsData.Item, false);
					
					fs.writeFileSync("packages/outfits/maleData.json", JSON.stringify(maleOutfits));
					fs.writeFileSync("packages/outfits/femaleData.json", JSON.stringify(femaleOutfits));
					console.log(`Loaded ${maleOutfits.length} male and ${femaleOutfits.length} female outfits.`);
				}
			});
		}
	});
*/
}

mp.events.add("playerJoin", (player) =>
{
	player.outfit = 0;
	
	player.setOutfit = function(id)
	{
		if (!isNaN(id)) {
			switch (player.model) {
				case mp.joaat("mp_m_freemode_01"):
					if (id < 0 || id >= maleOutfits.length) {
						player.outputChatBox(`Invalid ID, valid IDs are from 0 to ${maleOutfits.length - 1}.`);
					} else {
						player.outfit = id;
						for (let i = 0; i < maxComponent; i++) player.setClothes(i, maleOutfits[id].Components[i].Drawable, maleOutfits[id].Components[i].Texture, 2);
						for (let i = 0; i < maxProp; i++) player.setProp(i, maleOutfits[id].Props[i].Drawable, maleOutfits[id].Props[i].Texture);
					}
				break;

				case mp.joaat("mp_f_freemode_01"):
					if (id < 0 || id >= femaleOutfits.length) {
						player.outputChatBox(`Invalid ID, valid IDs are from 0 to ${femaleOutfits.length - 1}.`);
					} else {
						player.outfit = id;
						for (let i = 0; i < maxComponent; i++) player.setClothes(i, femaleOutfits[id].Components[i].Drawable, femaleOutfits[id].Components[i].Texture, 2);
						for (let i = 0; i < maxProp; i++) player.setProp(i, femaleOutfits[id].Props[i].Drawable, femaleOutfits[id].Props[i].Texture);
					}
				break;

				default:
					player.outputChatBox("Only freemode characters can use this command.");
			}
		} else {
			player.outputChatBox("Invalid ID format, use a number.");
		}		
	};
});

mp.events.addCommand("outfit", (player, id) => {
    id = parseInt(id);

    if (!isNaN(id)) {
        switch (player.model) {
            case mp.joaat("mp_m_freemode_01"):
                if (id < 0 || id >= maleOutfits.length) {
                    player.outputChatBox(`Invalid ID, valid IDs are from 0 to ${maleOutfits.length - 1}.`);
                } else {
                    for (let i = 0; i < maxComponent; i++) player.setClothes(i, maleOutfits[id].Components[i].Drawable, maleOutfits[id].Components[i].Texture, 2);
                    for (let i = 0; i < maxProp; i++) player.setProp(i, maleOutfits[id].Props[i].Drawable, maleOutfits[id].Props[i].Texture);
                }
            break;

            case mp.joaat("mp_f_freemode_01"):
                if (id < 0 || id >= femaleOutfits.length) {
                    player.outputChatBox(`Invalid ID, valid IDs are from 0 to ${femaleOutfits.length - 1}.`);
                } else {
                    for (let i = 0; i < maxComponent; i++) player.setClothes(i, femaleOutfits[id].Components[i].Drawable, femaleOutfits[id].Components[i].Texture, 2);
                    for (let i = 0; i < maxProp; i++) player.setProp(i, femaleOutfits[id].Props[i].Drawable, femaleOutfits[id].Props[i].Texture);
                }
            break;

            default:
                player.outputChatBox("Only freemode characters can use this command.");
        }
    } else {
        player.outputChatBox("Invalid ID format, use a number.");
    }
});