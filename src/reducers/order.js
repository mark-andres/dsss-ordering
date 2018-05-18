import uuidv4 from 'uuid/v4';

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
    id: uuidv4()
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
      return order;

    case types.SEND_ORDER:
      return order;

    case types.PRINT_ORDER:
      return order;

    case types.ADD_MODIFIER:
      return order;

    case types.REMOVE_MODIFIER:
      return order;

    default:
      return order;
  }
}

export default orderReducer;