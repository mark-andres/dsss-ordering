import types from '../actions/types';

export const defaultScratchPad = {
  items: [],
  halfOrdering: false,
  completedItem: null,
  sizeRequired: false
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

const computeCompletedItem = scratchPad => {
  const { items, halfOrdering, sizeRequired, size } = scratchPad;
  let allItemsEntered = false;
  let completedItem;

  if (sizeRequired && !size) {
    return scratchPad;
  }

  if (halfOrdering) {
    if (items.length === 2) {
      completedItem = {
        name: `H1-${items[0].conciseName}/H2-${items[1].conciseName}`,
        modifiersH1: items[0].modifiers,
        modifiersH2: items[1].modifiers,
        quantity: 1,
        price: ((getPrice(size, items[0]) + getPrice(size, items[1])) / 2),
        size
      }
      allItemsEntered = true;
    }
  } else {
    if (items.length === 1) {
      completedItem = {
        ...items[0],
        quantity: 1,
        price: getPrice(size, items[0]),
        size: size || 0
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
  const maxItems = scratchPad.halfOrdering ? 1 : 0;
  if (scratchPad.items.length <= maxItems) {
    scratchPad.items = scratchPad.items.concat(item);
    return computeCompletedItem(scratchPad);
  } else {
    return scratchPad;
  }
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
  return computeCompletedItem({
    ...scratchPad,
    size
  });
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
      return {
        items: [],
        halfOrdering: false,
        completedItem: null,
        sizeRequired: false
      };

    default:
      return scratchPad;
  }
}

export default scratchPadReducer;