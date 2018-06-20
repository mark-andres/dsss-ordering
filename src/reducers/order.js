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

const getModifierAttributes = qualifiers => {
  const { extra, lite, side } = qualifiers;
  return {
    extra, lite, side
  }
}

const getModifierLocation = qualifiers => {
  const { h1, h2 } = qualifiers;
  if (h1) {
    return 'h1';
  } else if (h2) {
    return 'h2';
  } else {
    return 'whole';
  }
}

const findModifierIndex = (modifiers, modifierName, location) => {
  return modifiers.findIndex(modifier => modifier.name === modifierName && modifier.location === location);
}

const addModifier = (modifiers, modifier) => {
  return modifiers.concat(modifier);
}

const updateModifier = (modifiers, index, updatedModifier) => {
  return [ 
    ...modifiers.slice(0, index),
    updatedModifier,
    ...modifiers.slice(index+1)
  ]
}

const removeModifier = (modifiers, index) => {
  return [
    ...modifiers.slice(0, index),
    ...modifiers.slice(index+1)
  ];
}

const attributesAreClear = attributes => {
  const { extra, lite, side } = attributes;
  return extra === 0 && lite === false && side === false;
}

const applyModifierStatus = (modifier, changeAttributes) => {
  if (attributesAreClear(changeAttributes) && modifier.status === 'included') {
    return 'excluded';
  } else {
    return 'included';
  }
}

const applyAttributes = (modifierAttributes, changeAttributes) => {
  if (changeAttributes.extra) {
    modifierAttributes.extra++;
    if (modifierAttributes > 4) {
      modifierAttributes = 0;
    }
  } else if (changeAttributes.lite) {
    modifierAttributes.lite = !modifierAttributes.lite;
  } else if (changeAttributes.side) {
    modifierAttributes.side = !modifierAttributes.side;
  }

  return { ...modifierAttributes };
}

export const addIncludedModifiers = (modifiers, item, part) => {
  const { includes, menu } = item;
  if (!menu) {
    return null;
  }

  menu.items.forEach(menuItem => {
    if (includes && includes.includes(menuItem.name)) {
      modifiers = addIncludedModifier(modifiers, menuItem, part);
    }
  });

  return modifiers;
}

const addIncludedModifier = (modifiers = [], includedModifier, part = 'whole') => {
  const modifier1 = {
    ...includedModifier,
    status: 'included',
    attributes: { extra: 0, lite: false, side: false },
    location: 'h1'
  };
  modifier1.price = modifier1.price / 2;
  const modifier2 = {
    ...includedModifier,
    status: 'included',
    attributes: { extra: 0, lite: false, side: false },
    location: 'h2'
  };
  modifier2.price = modifier2.price / 2;

  if (part && part !== 'whole') {
    modifiers.concat({
      ...modifier1,
      location: part
    });
  } else {
    return modifiers.concat(modifier1).concat(modifier2);
  }
}

const changeHalfModifier = (modifiers, modifierToChange, changeAttributes, half) => {
  const modifierIndex = findModifierIndex(modifiers, modifierToChange.name, half);

  if (modifierIndex === -1) {
    return addModifier(modifiers, {
      ...modifierToChange,
      status: 'added',
      attributes: { ...changeAttributes },
      location: half
    });
  } else {
    const modifier = modifiers[modifierIndex];
    if (modifier.status === 'added' && attributesAreClear(modifier.attributes)) {
      return removeModifier(modifiers, modifierIndex);
    }

    const status = applyModifierStatus(modifier, changeAttributes);
    const attributes = applyAttributes(modifier.attributes, changeAttributes);

    return updateModifier(modifiers, modifierIndex, {
      ...modifierToChange,
      status,
      attributes,
      location: half
    });
  }
}

const changeModifier = (order, item, modifierToChange, qualifiers) => {
    const changeLocation = getModifierLocation(qualifiers);
    const changeAttributes = getModifierAttributes(qualifiers);
    let newModifiers;
    const _modifierToChange = { ...modifierToChange };
    _modifierToChange.price = _modifierToChange.price / 2;
    
    switch (changeLocation) {
      case 'whole':
        newModifiers = changeHalfModifier(item.modifiers, _modifierToChange, changeAttributes, 'h1');
        newModifiers = changeHalfModifier(newModifiers, _modifierToChange, changeAttributes, 'h2');
        break;
      case 'h1':
      case 'h2':
        newModifiers = changeHalfModifier(item.modifiers, _modifierToChange, changeAttributes, changeLocation);
        break;

      default: 
        return order;
    }

    return changeItem(order, {
      ...item,
      modifiers: [ ...newModifiers ]
    });
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
    let { price, quantity, status } = item;
    let modifiersSum = 0;
    let modifiersH1Sum = 0;
    let modifiersH2Sum = 0;
    let subItemsSum = 0;

    price = price || 0;
    quantity = quantity || 1;
    if (status && (status === 'included' || status === 'excluded')) {
      price = 0;
    }

    if (item.modifiers) {
      modifiersSum = calculateSubTotals(item.modifiers);
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

    case types.CHANGE_MODIFIER:
      return changeModifier(order, action.item, action.modifier, action.options);

    default:
      return order;
  }
}

export default orderReducer;