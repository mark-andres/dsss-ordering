import _ from 'lodash';
import types from '../actions/types';
import { getTopMenu } from '../data/menu';

const menuDefault = {
  menu: getTopMenu(),
  currentMenu: getTopMenu()[0],
  menuStack: [getTopMenu()[0]] 
}

const menuReducer = (state = menuDefault, action) => {
  let newState;

  switch (action.type) {
    case types.SET_CURRENT_MENU:
      let currentMenu;
      if (_.isArray(action.menu)) {
        currentMenu = _.assign({}, _.property(action.menu)(state.menu));
        state.menuStack = [ getTopMenu()[action.menu[0]] ];
      } else {
        currentMenu = { ...action.menu };
      }
      newState = {
        ...state,
        currentMenu
      };
      return newState;

    case types.RESET_CURRENT_MENU:
      return menuDefault;

    case types.MAKE_TOP_MENU_CURRENT:
      newState = {
        ...state,
        currentMenu: { ...action.topMenu },
      };
      newState.menuStack = [newState.currentMenu];
      return newState;

    case types.RESTORE_TOP_MENU:
      newState = {
        ...state,
        currentMenu: { ...state.menuStack[0] }
      }      
      newState.menuStack = [newState.currentMenu];
      return newState;

    default:
      return state;
  }
}

export default menuReducer;