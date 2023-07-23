const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const Point = NativeUI.Point;

dr.driftMenu = new Menu("Main Menu", "~r~F2~w~/~r~Backspace~w~ for close menu", new Point(1250, 150));
dr.driftMenu.Visible = false;

let childMenuOpened = false;
// F2
mp.keys.bind(0x71, false, () => {
  if (childMenuOpened) {
    mp.game.graphics.notify("Child menu opened");
    return;
  }

  dr.driftMenu.Visible = !dr.driftMenu.Visible;
});

dr.driftMenu.MenuChange.on((menu, isChildMenu) => {
  mp.console.logError(`MenuChange: ${menu.TitleText}, isChild: ${isChildMenu}`);

  if (menu == dr.driftMenu) {
    childMenuOpened = false;
    return;
  }

  childMenuOpened = true;
})

dr.driftMenu.MenuOpen.on(() => {
  childMenuOpened = false;
})

dr.driftMenu.MenuClose.on(() => {
  childMenuOpened = false;
})