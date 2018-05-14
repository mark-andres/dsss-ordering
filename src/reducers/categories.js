import { SET_CURRENT_CATEGORY } from '../actions/types';
import categories from '../data/categories';

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      const newState = {
        ...state,
        currentCategory: { ...action.category }
      };
      return newState;

    default:
      return {
        categories: [...categories],
        currentCategory: { ...categories[0] }
      }
  }
}

export default categoriesReducer;