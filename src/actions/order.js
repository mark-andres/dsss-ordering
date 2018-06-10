import types from './types';

export const addItem = item => ({
  type: types.ADD_ITEM,
  item
});

export const removeItem = item => ({
  type: types.REMOVE_ITEM,
  item
});

export const changeItem = item => ({
  type: types.CHANGE_ITEM,
  item
});

export const copyItem = item => ({
  type: types.COPY_ITEM,
  item
});

export const setSelectedItem = item => ({
  type: types.SET_SELECTED_ITEM,
  item
});

export const sendOrder = () => ({
  type: types.SEND_ORDER
});

export const printOrder = () => ({
  type: types.PRINT_ORDER
});

export const addModifier = (item, modifier) => ({
  type: types.ADD_MODIFIER,
  item,
  modifier
});

export const changeModifier = (item, modifier, options) => ({
  type: types.CHANGE_MODIFIER,
  item,
  modifier,
  options
});

export const removeModifier = (item, modifier) => ({
  type: types.REMOVE_MODIFIER,
  item,
  modifier
});