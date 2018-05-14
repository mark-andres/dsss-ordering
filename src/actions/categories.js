import './types';
import { SET_CURRENT_CATEGORY } from './types';

export const setCurrentCategory = category => ({
  type: SET_CURRENT_CATEGORY,
  category
});

