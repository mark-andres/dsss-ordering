import uuid from 'uuid/v4';

import { TAX_RATE } from '../data';
import types from '../actions/types';

export const orderDefault = {
  orderNumber: 'New',
  items: [],
  selectedItem: null,
  subtotal: 0,
  tax: 0,
  total: 0
};

const addItem = (order, item) => {
  // Create new item
  const selectedItem = {
    ...item,
    id: uuid()
  };
  
  // Create new items array with the new item
  const items = order.items.concat(selectedItem);

  // Recalc the totals
  const {subtotal, tax, total} = calculateTotals(items);

  // Return new order with the new item added
  return {
    ...order, 
    items,
    selectedItem,
    subtotal,
    tax,
    total
  };
}

const removeItem = (order, itemToRemove) => {
  // Create new items array without removed item
  const items = order.items.filter(item => item.id !== itemToRemove.id)

  // Recalc the totals
  const {subtotal, tax, total} = calculateTotals(items);

  // Return new order with item removed
  return {
    ...order, 
    items,
    selectedItem: null,
    subtotal,
    tax,
    total
  };
}

const changeItem = (order, itemToChange) => {
  // Create a new array with the item changed
  const items = order.items.map(item => {
    if (itemToChange.id === item.id) {
      order.selectedItem = {
        ...item,
        ...itemToChange
      };
      return order.selectedItem;
    } else {
      return item;
    }
  });

  // Recalc the totals
  const {subtotal, tax, total} = calculateTotals(items);

  // Return new order with item changed
  return {
    ...order, 
    items,
    subtotal,
    tax,
    total
  };
}

const addModifier = (order, item, modifier) => {
  const modifiers = item.modifiers || [];
  const newItem = {
    ...item,
    modifiers: modifiers.concat({
      ...modifier,
      id: uuid()
    })
  };

  return changeItem(order, newItem);
}

const removeModifier = (order, item, modifierToRemove) => {
  const modifiers = item.modifiers.filter(modifier => modifier.id !== modifierToRemove.id);
  const newItem = {
    ...item,
    modifiers
  }

  return changeItem(order, newItem);
}

function calculateTotals(items) {
  const subtotal = calculateSubTotals(items);
  const tax = subtotal * TAX_RATE;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  }
}

function calculateSubTotals(items) {
  return items.reduce((total, item) => {
    if (item.price) {
      let modifiersSum = 0;
      if (item.modifiers) {
        modifiersSum = calculateSubTotals(item.modifiers);
      }
      return total + item.price + modifiersSum;
    } else {
      return total;
    }
  }, 0);
}

const orderReducer = (order = orderDefault, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      return addItem(order, action.item);

    case types.REMOVE_ITEM:
      return removeItem(order, action.item);
      
    case types.CHANGE_ITEM:
      return changeItem(order, action.item);

    case types.SEND_ORDER:
      return orderDefault;

    case types.PRINT_ORDER:
      return orderDefault;

    case types.ADD_MODIFIER:
      return addModifier(order, action.item, action.modifier);

    case types.REMOVE_MODIFIER:
      return removeModifier(order, action.item, action.modifier);

    default:
      return order;
  }
}

export default orderReducer;