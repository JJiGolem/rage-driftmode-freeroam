const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
// const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const ItemsCollection = NativeUI.ItemsCollection;
const Point = NativeUI.Point;

const clothesComponents = [
  "Head",
  "Masks",
  "Hair Styles",
  "Torsos",
  "Legs",
  "Bags and Parachutes",
  "Shoes",
  "Accessories",
  "Undershirts",
  "Body Armors",
  "Decals",
  "Tops"
]

const propsComponents = [
  "Hats",
  "Glasses",
  "Ears",
  "",
  "",
  "",
  "Watches",
  "Bracelets"
]

const localPlayer = mp.players.local;

// Add Menu open item to main menu
const clothesMenu = new Menu("Clothes Menu", "", new Point(1250, 150));
const clothesMenuItem = new UIMenuItem("Clothes Menu");
dr.driftMenu.BindMenuToItem(clothesMenu, clothesMenuItem);

const clothesComponentsMenu = new Menu("Clothes Components", "", new Point(1250, 150))
const propsComponentsMenu = new Menu("Props Components", "", new Point(1250, 150));

const clothesComponentsMenuItem = new UIMenuItem("Clothes");
const propsComponentsMenuItem = new UIMenuItem("Props");

clothesMenu.BindMenuToItem(clothesComponentsMenu, clothesComponentsMenuItem);
clothesMenu.BindMenuToItem(propsComponentsMenu, propsComponentsMenuItem);

mp.events.add("playerReady", () => {
  initClothes();
  initProps();
})

function initClothes() {
  for (const i in clothesComponents) {
    const index = parseInt(i);
    const componentName = clothesComponents[index];
    
    if (componentName.length < 1) {
      continue;
    }
  
    const drawablesCollection = getDrawablesCollection(index, false);
    const texturesCollection = getTexturesCollection(index, false);
  
    const componentItem = new UIMenuItem(componentName);
    const componentMenu = new Menu(componentName, `Drawables: ${drawablesCollection.length()}`, new Point(1250, 150));
  
    const drawableListItem = new UIMenuListItem("Drawable", "", drawablesCollection, localPlayer.getDrawableVariation(index), index);
    const textureListItem = new UIMenuListItem("Texture", "", texturesCollection, localPlayer.getTextureVariation(index), index);
  
    componentMenu.AddItem(drawableListItem);
    componentMenu.AddItem(textureListItem);
  
    clothesComponentsMenu.BindMenuToItem(componentMenu, componentItem);

    componentMenu.ListChange.on((item, listIndex) => {
      const componentId = parseInt(item.Data);
      if (item == drawableListItem) {
        localPlayer.setComponentVariation(componentId, listIndex, 0, 0);
        textureListItem.setCollection(getTexturesCollection(componentId, false));
        textureListItem.Index = 0;
      }
      else if (item == textureListItem) {
        localPlayer.setComponentVariation(componentId, localPlayer.getDrawableVariation(componentId), listIndex, 0);
      }
    })
  }
}

function initProps() {
  for (const i in propsComponents) {
    const index = parseInt(i);
    const componentName = propsComponents[index];
    
    if (componentName.length < 1) {
      continue;
    }
  
    const drawablesCollection = getDrawablesCollection(index, true);
    const texturesCollection = getTexturesCollection(index, true);
  
    const componentItem = new UIMenuItem(componentName);
    const componentMenu = new Menu(componentName, `Drawables: ${drawablesCollection.length()}`, new Point(1250, 150));

    const clearPropItem = new UIMenuItem("Clear", "", index);
    const drawableListItem = new UIMenuListItem("Drawable", "", drawablesCollection, localPlayer.getPropIndex(index), index);
    const textureListItem = new UIMenuListItem("Texture", "", texturesCollection, localPlayer.getPropTextureIndex(index), index);
  
    componentMenu.AddItem(clearPropItem);
    componentMenu.AddItem(drawableListItem);
    componentMenu.AddItem(textureListItem);
  
    propsComponentsMenu.BindMenuToItem(componentMenu, componentItem);

    componentMenu.ListChange.on((item, listIndex) => {
      const componentId = parseInt(item.Data);
      if (item == drawableListItem) {
        localPlayer.setPropIndex(componentId, listIndex, 0, true);
        textureListItem.setCollection(getTexturesCollection(componentId, true));
        textureListItem.Index = 0;
      }
      else if (item == textureListItem) {
        localPlayer.setPropIndex(componentId, localPlayer.getPropIndex(componentId), listIndex, true);
      }
    })

    componentMenu.ItemSelect.on((item, index) => {
      if (item == clearPropItem) {
        localPlayer.clearProp(parseInt(item.Data));
        drawableListItem.Index = 0;
        textureListItem.Index = 0;
      }
    })
  }
}

function getDrawablesCollection(componentId, isProp) {
  const count = isProp
   ? localPlayer.getNumberOfPropDrawableVariations(componentId)
   : localPlayer.getNumberOfDrawableVariations(componentId);
  
  return new ItemsCollection(Array.from(new Array(count || 1), (x, i) => i));
}

function getTexturesCollection(componentId, isProp) {
  const count = isProp
    ? localPlayer.getNumberOfPropTextureVariations(componentId, localPlayer.getPropIndex(componentId))
    : localPlayer.getNumberOfTextureVariations(componentId, localPlayer.getDrawableVariation(componentId));
  
  return new ItemsCollection(Array.from(new Array(count || 1), (x, i) => i));
}