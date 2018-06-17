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

const changeIncludedWholeModifierInHalf = (item, modifierToChange, options) => {

}

const changeAddedWholeModifierInHalf = (item, modifierToChange, options) => {

}

const changeIncludedModifierInHalf = (item, modifierToChange, options) => {

}

const changeIncludedModifierInWhole = (item, modifierToChange, options) => {

}

const changeIncludedModifier = (item, modifierToChange, options) => {
  if (options.h1 || options.h2) {
    return changeIncludedModifierInHalf(item , modifierToChange, options);
  } else {
    return changeIncludedModifierInWhole(item, modifierToChange, options);
  }
}

const changeAddedModifierInHalf = (item, modifierToChange, options) => {

}

const changeAddedModifierInWhole = (item, modifierToChange, options) => {

}

const changeAddedModifier = (item, modifierToChange, options) => {
  if (options.h1 || options.h2) {
    return changeAddedModifierInHalf(item , modifierToChange, options);
  } else {
    return changeAddedModifierInWhole(item, modifierToChange, options);
  }
}

const changeModifier = (order, item, modifierToChange, options = defaultModifierOptions) => {
  const newItem = _.merge({ modifiers: [], modifiersH1: [], modifiersH2: []}, item);

  // get the correct modifiers array depending on the value of options.part
  const modifiers = getModifiersArray(newItem, options);
  // find the index of the modifier
  const modifierIndex = modifiers.findIndex(mod => mod.name === modifierToChange.name);
  // get the modifier from the index
  const modifier = modifierIndex !== -1 ? modifiers[modifierIndex] : undefined;

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
        return removeModifier(order, newItem, { ...modifierToChange, flags });
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

    setModifiersArray(newItem, newModifiers, options);


    return changeItem(order, { ...newItem });
  } else {
    return addModifier(order, newItem, { ...modifierToChange, flags: options });
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