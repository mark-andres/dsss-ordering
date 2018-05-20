import { SET_CURRENT_MENU, RESET_CURRENT_MENU } from '../actions/types';
import { MENU, getTopMenu } from '../data/menu';

const menuDefault = {
  menu: getTopMenu(),
  currentMenu: {
    ...MENU.Pizza
  }
}

const menuReducer = (menu = menuDefault, action) => {
  switch (action.type) {
    case SET_CURRENT_MENU:
      const newState = {
        ...menu,
        currentMenu: { ...action.menu }
      };
      return newState;

    case RESET_CURRENT_MENU:
      return menuDefault;

    default:
      return menu;
  }
}

export default menuReducer;