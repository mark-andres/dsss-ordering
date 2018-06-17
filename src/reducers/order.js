import _ from 'lodash';

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
  };

  // Create new items array with the new item
  const items = order.items.concat(selectedItem);

  // Recalc the totals
  const { subtotal, tax, total } = calculateTotals(items);

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
  const { subtotal, tax, total } = calculateTotals(items);

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
  const { subtotal, tax, total } = calculateTotals(items);

  // Return new order with item changed
  return {
    ...order,
    items,
    subtotal,
    tax,
    total
  };
}

// modifier options
//   extra: 0, 1, 2 - meaning 0 'not extra', 1 'extra', 2 'extra extra'...n 'extra nTimes' (default - 0) 
//   lite: false, true (default - false)
//   
const defaultModifierOptions = {
  extra: 0,         // 'extra' n times
  lite: false,      // false, true
  whole: true,
  h1: false,
  h2: false,
}

const getModifiersArray = (item, options) => {
  let modifiersProp = 'modifiers';
  if (options.h1) {
    modifiersProp = 'modifiersH1';
  } else if (options.h2) {
    modifiersProp = 'modifiersH2';
  }
  return item[modifiersProp]; 
}

const getModifier = (item, modifierName, options) => {
  const modifiers = getModifiersArray(item, options);
  return modifiers.find(modifier => modifier.name === modifierName);
}

const getAllModifiers = (item, modifierName) => {
  return [...item.modifiers, ...item.modifiersH1, ...item.modifiersH2].filter(modifier.name === modifierName);
}

const setModifiersArray = (item, modifiers, options) => {
  let modifiersProp = 'modifiers';
  if (options.h1) {
    modifiersProp = 'modifiersH1';
  } else if (options.h2) {
    modifiersProp = 'modifiersH2';
  }
  item[modifiersProp] = modifiers;
}

const addModifier = (order, item, modifier) => {
  const modifiers = getModifiersArray(item, modifier.flags).concat({ ...modifier });
  let newItem;

  if (modifier.flags.h1) {
    newItem = {
      ...item, 
      modifiersH1: modifiers
    }    
  } else if (modifier.flags.h2) {
    newItem = {
      ...item, 
      modifiersH2: modifiers
    }    
  } else {
    newItem = {
      ...item, 
      modifiers: modifiers
    }    
  }

  return changeItem(order, newItem);
}

const removeModifier = (order, item, modifierToRemove) => {
  const modifiers = getModifiersArray(item, modifierToRemove.flags)
    .filter(modifier => modifier.name !== modifierToRemove.name)

  let newItem;

  if (modifierToRemove.flags.h1) {
    newItem = {
      ...item, 
      modifiersH1: modifiers
    }    
  } else if (modifierToRemove.flags.h2) {
    newItem = {
      ...item, 
      modifiersH2: modifiers
    }    
  } else {
    newItem = {
      ...item, 
      modifiers: modifiers
    }    
  }

  return changeItem(order, newItem);
}

const changeModifier = (order, item, modifierToChange, options = defaultModifierOptions) => {
  let newItem = _.merge({ modifiers: [], modifiersH1: [], modifiersH2: []}, item);

  
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
    let { price, quantity, flags } = item;
    let modifiersSum = 0;
    let modifiersH1Sum = 0;
    let modifiersH2Sum = 0;
    let subItemsSum = 0;

    price = price || 0;
    quantity = quantity || 1;
    if (flags && flags.negated) {
      price = 0;
    }

    if (item.modifiers) {
      modifiersSum = calculateSubTotals(item.modifiers);
    }
    if (item.modifiersH1) {
      modifiersH1Sum = calculateSubTotals(item.modifiersH1);
    }
    if (item.modifiersH2) {
      modifiersH2Sum = calculateSubTotals(item.modifiersH1);
    }
    if (item.subItems) {
      subItemsSum = item.subItems.reduce((total, subItem) => {
        const { price } = subItem;
        if (price) {
          return total + price;
        } else {
          return total;
        }
      }, 0);
    }

    return total + quantity * (price + modifiersSum + modifiersH1Sum + modifiersH2Sum + subItemsSum);
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

    case types.COPY_ITEM:
      return addItem(order, _.cloneDeep(action.item));

    case types.SET_SELECTED_ITEM:
      return {
        ...order,
        selectedItem: { ...action.item }
      };

    case types.SEND_ORDER:
      return orderDefault;

    case types.PRINT_ORDER:
      return orderDefault;

    case types.ADD_MODIFIER:
      return addModifier(order, action.item, action.modifier);

    case types.CHANGE_MODIFIER:
      return changeModifier(order, action.item, action.modifier, action.options);

    case types.REMOVE_MODIFIER:
      return removeModifier(order, action.item, action.modifier);

    default:
      return order;
  }
}

export default orderReducer;