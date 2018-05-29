import orderReducer from './order';
import menuReducer from './menu';
import scratchPadReducer from './scratchPad';
import types from '../actions/types';
import { addItem, setSelectedItem } from '../actions/order';
import { resetScratch, setSizeRequired } from '../actions/scratchPad';
import { setCurrentMenu } from '../actions/menu';


const setChoices = (state, choices, modifierMenu) => {
  state.choiceItems = [];
  state.returnMenu = state.menu.currentMenu;

  state.choices = [...choices];
  state.currentChoiceIndex = 0;
  state.menu.currentMenu = {
    ...state.choices[state.currentChoiceIndex]
  }

  return state;
}

const setNextChoice = (state, chosenItem) => {
  state.choiceItems = state.choiceItems.concat(chosenItem);

  let { currentChoiceIndex } = state;

  currentChoiceIndex++;
  if (currentChoiceIndex < state.choices.length) {
    state.currentChoiceIndex = currentChoiceIndex;
    state.menu.currentMenu = state.choices[state.currentChoiceIndex];
  } else {
    const subItems = state.choiceItems.map(choice => choice.name);
    state.order = orderReducer(
      state.order,
      addItem({
        ...state.scratchPad.completedItem,
        scratchPad: state.scratchPad,
        subItems
      })
    );
    state.menu.currentMenu = state.returnMenu;
  }

  return { ...state };
}

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_NEXT_CHOICE:
      return setNextChoice(state, action.chosenItem);

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
        const { choices } = state.scratchPad.completedItem;
        const modifiersMenu = state.menu.currentMenu.modifiers;
        if (choices) {
          state = setChoices(state, choices, modifiersMenu);
        } else {
          state.order = orderReducer(
            state.order,
            addItem({
              ...state.scratchPad.completedItem,
              scratchPad: state.scratchPad
            })
          );
          if (modifiersMenu) {
            state.menu = menuReducer(state.menu, setCurrentMenu(modifiersMenu));
          }
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