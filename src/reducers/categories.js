import { SET_CURRENT_CATEGORY } from '../actions/types';
import categories from '../data/categories';

const categoriesDefault = {
  categories,
  currentCategory: {
    ...categories[0]
  }
}

const categoriesReducer = (state = categoriesDefault, action) => {
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

export default categoriesReducer;