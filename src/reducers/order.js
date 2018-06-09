import uuid from 'uuid/v1';

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
    id: uuid(),
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
//   part: 'h1', 'h2', or 'whole' (default)
//   
const defaultModifierOptions = {
  extra: 0,         // 'extra' button off/on - 0/1
  lite: false,      // false, true
  part: 'whole',    // whole, h1, h2
  default: false,   // modifier is included in the item
  negated: false    // if true, modifier is excluded; default must be true for negated to be true
}

const getModifiersArray = (item, options) => {
  let modifiersProp = 'modifiers';
  if (options.part === 'h1') {
    modifiersProp = 'modifiersH1';
  } else if (options.part === 'h2') {
    modifiersProp = 'modifiersH2';
  }
  return item[modifiersProp]; 
}

const setModifiersArray = (item, modifiers, options) => {
  let modifiersProp = 'modifiers';
  if (options.part === 'h1') {
    modifiersProp = 'modifiersH1';
  } else if (options.part === 'h2') {
    modifiersProp = 'modifiersH2';
  }
  item[modifiersProp] = modifiers;
}

const addModifier = (order, item, modifier) => {
  const modifiers = item.modifiers || [];
  const newItem = {
    ...item,
    modifiers: modifiers.concat({
      ...modifier,
    })
  };

  return changeItem(order, newItem);
}

const removeModifier = (order, item, modifierToRemove) => {
  const modifiers = item.modifiers.filter(modifier => modifier.name !== modifierToRemove.name);
  const newItem = {
    ...item,
    modifiers
  }

  return changeItem(order, newItem);
}

// Change a modifier.
// If the modifier exists... 
//    If it's a default modifier...
//      If quantity adjustment (lite or extra) is requested
//        flag the modifier to be lite or extra, ... 
//      Else
//        negate it
//      
//      Update the altered modifier
//    Else If it's not a default modifier
//      remove it
//
// If the modifier doesn't exist... 
//    Add it with appropriate flags (extra, lite, side)
//
const changeModifier = (order, item, modifierToChange, options = defaultModifierOptions) => {
  // get the correct modifiers array depending on the value of options.part
  const modifiers = getModifiersArray(item, options);
  // find the index of the modifier
  const modifierIndex = item.modifiers.findIndex(mod => mod.name === modifierToChange.name);
  // get the modifier from the index
  const modifier = modifierIndex !== -1 ? item.modifiers[modifierIndex] : undefined;

  if (modifier) {                         // if the modifier already exists
    let flags = modifier.flags || {};     // get existing modifier flags
    let { quantity } = modifier;

    quantity = quantity || 0;

    if (flags.default) {                  // if it's a default modifier
      if (options.extra) {                  // if extra is set
        modifier.quantity = quantity + options.extra;       // increment the modifier quantity
        flags.extra = (flags.extra || 0) + options.extra;   // indicate HOW MUCH extra
      } else if (options.lite) {            // if lite is set
        flags.lite = options.lite;              // indicate that the modifier is lite
      } else {
        flags.negated = !flags.negated;     // toggle the negated flag
      }
    } else {
      if (options.extra) {                  // if extra is set
        modifier.quantity = quantity + options.extra;       // increment the modifier quantity
        flags.extra = (flags.extra || 0) + options.extra;   // indicate HOW MUCH extra
      } else if (options.lite) {            // if lite is set
        flags.lite = options.lite;              // indicate that the modifier is lite
      } else {
        return removeModifier(order, item, modifierToChange);
      }
    }

    const newModifiers = [
      ...modifiers.slice(0, modifierIndex),
      {
        ...modifierToChange,
        flags: { ...flags }
      },
      ...modifiers.slice(modifierIndex + 1)
    ];

    setModifiersArray(item, newModifiers, options);


    return changeItem(order, { ...item });
  } else {
    return addModifier(order, item, { ...modifierToChange, flags: options });
  }
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
      modifiersSum = calculateSubTotals(item.modifiersH1);
    }
    if (item.modifiersH2) {
      modifiersSum = calculateSubTotals(item.modifiersH1);
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

    return total + quantity * (price + modifiersSum + modifiersH1Sum + modifiersH2Sum) + subItemsSum;
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