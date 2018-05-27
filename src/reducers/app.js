import orderReducer from './order';
import menuReducer from './menu';
import scratchPadReducer from './scratchPad';
import types from '../actions/types';
import { addItem, setSelectedItem } from '../actions/order';
import { resetScratch, setSizeRequired } from '../actions/scratchPad';
import { setCurrentMenu } from '../actions/menu';

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.MAKE_TOP_MENU_CURRENT:
    case types.RESTORE_TOP_MENU:
      state.menu = menuReducer(state.menu, action);
      state.order = orderReducer(
        state.order, setSelectedItem(null)
      );
      state.scratchPad = scratchPadReducer(
        state.scratchPad, 
        resetScratch()
      );
      if (state.menu.currentMenu.sizes) {
        state.scratchPad = scratchPadReducer(
          state.scratchPad,
          setSizeRequired(true)
        )
      }
      return { ...state };

    case types.TOGGLE_ITEM_IN_SCRATCH:
    case types.SET_ITEM_SIZE:
      state.scratchPad = scratchPadReducer(state.scratchPad, action);
      if (state.scratchPad.completedItem) {
        state.order = orderReducer(
          state.order, 
          addItem({
            ...state.scratchPad.completedItem,
            scratchPad: state.scratchPad
          })
        );
        if (state.menu.currentMenu.modifiers) {
          state.menu = menuReducer(state.menu, setCurrentMenu(state.menu.currentMenu.modifiers));
        }
      }
      return { ...state };

    default:
      return {
        menu: menuReducer(state.menu, action),
        order: orderReducer(state.order, action),
        scratchPad: scratchPadReducer(state.scratchPad, action)
      };
  }
}

export default appReducer;