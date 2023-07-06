const fs = require("fs");

const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
const creatorPlayerHeading = -185.0;

// this will increase by 1 every time a player is sent to the character creator
let creatorDimension = 10000;


mp.events.add("playerJoin", (player) => {
    player.colorForOverlayIdx = function(index) {
        let color;

        switch (index) {
            case 1:
                color = this.stats.BeardColor;
            break;

            case 2:
                color = this.stats.EyebrowColor;
            break;

            case 5:
                color = this.stats.BlushColor;
            break;

            case 8:
                color = this.stats.LipstickColor;
            break;

            case 10:
                color = this.stats.ChestHairColor;
            break;

            default:
                color = 0;
        }

        return color;
    };

    player.defaultCharacter = function() {
        this.stats = {
            Gender: 0,

            Parents: {
                Father: 0,
                Mother: 0,
                Similarity: 1.0,
                SkinSimilarity: 1.0
            },

            Features: [],
            Appearance: [],

            Hair: {
                Hair: 0,
                Color: 0,
                HighlightColor: 0
            },

            EyebrowColor: 0,
            BeardColor: 0,
            EyeColor: 0,
            BlushColor: 0,
            LipstickColor: 0,
            ChestHairColor: 0
        };

        for (let i = 0; i < 20; i++) this.stats.Features.push(0.0);
        for (let i = 0; i < 10; i++) this.stats.Appearance.push({Value: 255, Opacity: 1.0});
        player.applyCharacter();
    };

    player.applyCharacter = function() {
        this.setCustomization(
            this.stats.Gender == 0,

            this.stats.Parents.Mother,
            this.stats.Parents.Father,
            0,

            this.stats.Parents.Mother,
            this.stats.Parents.Father,
            0,

            this.stats.Parents.Similarity,
            this.stats.Parents.SkinSimilarity,
            0.0,

            this.stats.EyeColor,
            this.stats.Hair.Color,
            this.stats.Hair.HighlightColor,

            this.stats.Features
        );

        this.setClothes(2, this.stats.Hair.Hair, 0, 2);
        for (let i = 0; i < 10; i++) this.setHeadOverlay(i, [this.stats.Appearance[i].Value, this.stats.Appearance[i].Opacity, this.colorForOverlayIdx(i), 0]);
    };

    /*player.loadCharacter = function(data) {
        if (!data) {
			this.defaultCharacter();
        } else {
            this.stats = data;
            this.applyCharacter();
        }
    };*/
	
    player.sendToCreator = function() {
        player.preCreatorPos = player.position;
        player.preCreatorHeading = player.heading;
        player.preCreatorDimension = player.dimension;

        player.position = creatorPlayerPos;
        player.heading = creatorPlayerHeading;
        player.dimension = creatorDimension;
        player.usingCreator = true;
        player.changedGender = false;
        player.call("toggleCreator", [true, JSON.stringify(player.stats)]);

        creatorDimension++;
    };

    player.sendToWorld = function() {
        player.position = player.preCreatorPos;
        player.heading = player.preCreatorHeading;
        player.dimension = player.preCreatorDimension;
        player.usingCreator = false;
        player.changedGender = false;
        player.call("toggleCreator", [false]);
    };
});

mp.events.add("creator_GenderChange", (player, gender) => {
    player.model = freemodeCharacters[gender];
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
    player.changedGender = true;
});

mp.events.add("creator_Save", (player, gender, parentData, featureData, appearanceData, hairAndColorData) => {
    player.stats.Gender = gender;
    player.stats.Parents = JSON.parse(parentData);
    player.stats.Features = JSON.parse(featureData);
    player.stats.Appearance = JSON.parse(appearanceData);

    let hairAndColors = JSON.parse(hairAndColorData);
    player.stats.Hair = {Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2]};
    player.stats.EyebrowColor = hairAndColors[3];
    player.stats.BeardColor = hairAndColors[4];
    player.stats.EyeColor = hairAndColors[5];
    player.stats.BlushColor = hairAndColors[6];
    player.stats.LipstickColor = hairAndColors[7];
    player.stats.ChestHairColor = hairAndColors[8];

    player.applyCharacter();
    player.sendToWorld();
});

mp.events.add("creator_Leave", (player) => {
	player.outputChatBox("You should create a character first.");
   // if (player.changedGender) player.loadCharacter(); // revert back to last save if gender is changed
    //player.applyCharacter();
    //player.sendToWorld();
});

/*mp.events.addCommand("creator", (player) => {
    if (freemodeCharacters.indexOf(player.model) == -1) {
        player.outputChatBox("/creator command is restricted to freemode characters.");
    } else if (player.vehicle) {
        player.outputChatBox("You can't use this command inside a vehicle.");
    } else {
        if (player.usingCreator) {
            player.sendToWorld();
        } else {
            player.sendToCreator();
        }
    }
});*/