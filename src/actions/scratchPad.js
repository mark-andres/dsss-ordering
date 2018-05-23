import { 
  ADD_ITEM_TO_SCRATCH,
  REMOVE_ITEM_FROM_SCRATCH,
  SET_ITEM_SIZE,
  SET_SIZE_REQUIRED,
  SET_HALF_ORDERING, 
  RESET_SCRATCH
} from './types';

export const addItemToScratch = item => ({
  type: ADD_ITEM_TO_SCRATCH,
  item
});

export const removeItemToScratch = item => ({
  type: REMOVE_ITEM_FROM_SCRATCH,
  item
});

export const setItemSize = size => ({
  type: SET_ITEM_SIZE,
  size
});

export const setSizeRequired = sizeRequired => ({
  type: SET_ITEM_SIZE,
  sizeRequired
});

export const setHalfOrdering = halfOrdering => ({
  type: SET_HALF_ORDERING,
  halfOrdering
});

export const resetScratch = () => ({
  type: RESET_SCRATCH
});