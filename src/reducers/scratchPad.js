import types from '../actions/types';
import { addIncludedModifiers } from '../reducers/order';

export const defaultScratchPad = {
  items: [],
  halfOrdering: false,
  completedItem: null,
  sizeRequired: true,
  size: undefined
}

const getPrice = (size, item) => {
  if (item.price) {
    return item.price;
  }

  if (item.priceMatrix) {
    return item.priceMatrix[size];
  }

  return 0;
}

const recomputeCompletedItem = scratchPad => {
  let completedItem;
  const { size, items } = scratchPad;

  if (items.length === 2) {
    completedItem = {
      completedItem: { ...scratchPad.completedItem },
      name: `${size} H1-${items[0].conciseName}/H2-${items[1].conciseName}`,
      price: ((getPrice(size, items[0]) + getPrice(size, items[1])) / 2),
      size
    }
  } else {
    completedItem = {
      completedItem: { ...scratchPad.completedItem },
      name: `${size} ${items[0].name}`,
      price: getPrice(size, items[0]),
      size
    }
  }

  return {
    ...scratchPad,
    completedItem
  }
}

const computeCompletedItem = scratchPad => {
  const { items, halfOrdering, sizeRequired, size } = scratchPad;
  let allItemsEntered = false;
  let completedItem;

  if (sizeRequired && !size) {
    return {
      ...scratchPad
    };
  }

  if (halfOrdering) {
    if (items.length === 2) {
      completedItem = {
        name: `H1-${items[0].conciseName}/H2-${items[1].conciseName}`,
        modifiers: addIncludedModifiers(addIncludedModifiers(undefined, items[0], 'h1'), items[1], 'h2'),
        quantity: 1,
        price: ((getPrice(size, items[0]) + getPrice(size, items[1])) / 2),
        size: size || ''
      }
      allItemsEntered = true;
    }
  } else {
    if (items.length === 1) {
      completedItem = {
        ...items[0],
        modifiers: addIncludedModifiers(undefined, items[0]),
        quantity: 1,
        price: getPrice(size, items[0]),
        size: size || ''
      }
      allItemsEntered = true;
    }
  }

  if (allItemsEntered) {
    if (size) {
      completedItem.name = size + ' ' + completedItem.name;
    }

    return {
      ...scratchPad,
      completedItem
    }
  }

  return scratchPad;
}

const addItemToScratch = (scratchPad, item) => {
  const items = scratchPad.items;
  const halfOrdering = scratchPad.halfOrdering;

  if (items.length === 0) {
    items[0] = item;
  } else if (halfOrdering) {
    if (items.length === 1) {
      items[1] = item;
    } else {
      items[0] = items[1];
      items[1] = item;
    }
  } else {
    items[0] = item;
  }
  scratchPad.items = [...items];
  return computeCompletedItem(scratchPad);
}

const removeItemFromScratch = (scratchPad, itemToRemove) => {
  const items = scratchPad.items.filter(item => item.key !== itemToRemove.key);
  return {
    ...scratchPad,
    items
  };
}

const toggleItemInScratch = (scratchPad, itemToToggle) => {
  const foundItem = scratchPad.items.find(item => item.key === itemToToggle.key);
  if (foundItem) {
    return removeItemFromScratch(scratchPad, foundItem);
  } else {
    return addItemToScratch(scratchPad, itemToToggle);
  }
}

const setItemSize = (scratchPad, size) => {
  if (scratchPad.completedItem) {
    return recomputeCompletedItem({
      ...scratchPad,
      size
    });
  } else {
    return computeCompletedItem({
      ...scratchPad,
      size
    });
  }
}

const scratchPadReducer = (scratchPad = defaultScratchPad, action) => {
  switch (action.type) {
    case types.ADD_ITEM_TO_SCRATCH:
      return addItemToScratch(scratchPad, action.item);

    case types.REMOVE_ITEM_FROM_SCRATCH:
      return removeItemFromScratch(scratchPad, action.item);

    case types.TOGGLE_ITEM_IN_SCRATCH:
      return toggleItemInScratch(scratchPad, action.item);

    case types.SET_SIZE_REQUIRED:
      return {
        ...scratchPad,
        sizeRequired: action.sizeRequired
      };

    case types.SET_ITEM_SIZE:
      return setItemSize(scratchPad, action.size);

    case types.SET_HALF_ORDERING:
      return {
        ...scratchPad,
        halfOrdering: action.halfOrdering
      };

    case types.RESET_SCRATCH:
      if (action.scratchPad) {
        return action.scratchPad;
      }
      return {
        items: [],
        halfOrdering: false,
        completedItem: null,
      };

    default:
      return scratchPad;
  }
}

export default scratchPadReducer;