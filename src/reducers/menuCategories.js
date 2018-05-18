import { SET_CURRENT_CATEGORY } from '../actions/types';
import categories from '../data/categories';

const menuCategoriesDefault = {
  categories,
  currentCategory: {
    ...categories[0]
  }
}

const menuCategoriesReducer = (state = menuCategoriesDefault, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      const newState = {
        ...state,
        currentCategory: { ...action.category }
      };
      return newState;

    default:
      return state;
  }
}

export default menuCategoriesReducer;