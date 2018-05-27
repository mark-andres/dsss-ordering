import './types';
import types from './types';

export const setCurrentMenu = menu => ({
  type: types.SET_CURRENT_MENU,
  menu
});

export const resetCurrentMenu = () => ({
  type: types.RESET_CURRENT_MENU,
});

export const makeTopMenuCurrentMenu = topMenu => ({
  type: types.MAKE_TOP_MENU_CURRENT,
  topMenu
});

export const restoreTopMenu = () => ({
  type: types.RESTORE_TOP_MENU
});