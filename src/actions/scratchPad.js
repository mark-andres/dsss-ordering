import { 
  ADD_ITEM_TO_SCRATCH,
  REMOVE_ITEM_FROM_SCRATCH,
  TOGGLE_ITEM_IN_SCRATCH,
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

export const toggleItemInScratch = item => ({
  type: TOGGLE_ITEM_IN_SCRATCH,
  item
});

export const setItemSize = size => ({
  type: SET_ITEM_SIZE,
  size
});

export const setSizeRequired = sizeRequired => ({
  type: SET_SIZE_REQUIRED,
  sizeRequired
});

export const setHalfOrdering = halfOrdering => ({
  type: SET_HALF_ORDERING,
  halfOrdering
});

export const resetScratch = scratchPad => ({
  type: RESET_SCRATCH,
  scratchPad
});