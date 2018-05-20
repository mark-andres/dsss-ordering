import './types';
import { SET_CURRENT_MENU, RESET_CURRENT_MENU } from './types';

export const setCurrentMenu = menu => ({
  type: SET_CURRENT_MENU,
  menu
});

export const resetCurrentMenu = () => ({
  type: RESET_CURRENT_MENU,
});
