import types from '../actions/types';
import { MENU, getTopMenu } from '../data/menu';

const menuDefault = {
  menu: getTopMenu(),
  currentMenu: MENU['Pizza'],
  menuStack: [MENU['Pizza']] 
}

const menuReducer = (menu = menuDefault, action) => {
  let newState;

  switch (action.type) {
    case types.SET_CURRENT_MENU:
      newState = {
        ...menu,
        currentMenu: { ...action.menu }
      };
      return newState;

    case types.RESET_CURRENT_MENU:
      return menuDefault;

    case types.MAKE_TOP_MENU_CURRENT:
      newState = {
        ...menu,
        currentMenu: { ...action.topMenu },
      };
      newState.menuStack = [newState.currentMenu];
      return newState;

    case types.RESTORE_TOP_MENU:
      newState = {
        ...menu,
        currentMenu: { ...menu.menuStack[0] }
      }      
      newState.menuStack = [newState.currentMenu];
      return newState;

    default:
      return menu;
  }
}

export default menuReducer;