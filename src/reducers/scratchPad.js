import types from '../actions/scratchPad';

const defaultScratchPad = {
  items: [],
  halfOrdering: false,
  completedItem: null,
  sizeRequired: false
}

const computeCompletedItem = scratchPad => {
  const { items, halfOrdering, sizeRequired, size } = scratchPad;
  const allItemsEntered = false;
  let completedItem;
  const newScratchPad = { ...scratchPad };

  if (sizeRequired && !size) {
    return scratchPad;
  }

  if (halfOrdering) {
    if (items.length === 2) {
      completedItem = {
        name: `H1-${items[0].name}/H2-${items[1].name}`,
        modifiersH1 = items[0].modifiers,
        modifiersH2 = items[1].modifiers,
        quantity: 1,
        price: (items[0].price + items[1].price) / 2
      }
      allItemsEntered = true;
    }
  } else {
    if (items.length === 1) {
      completedItem = {
        ...items[0],
        quantity: 1,
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

const setItemSize = (scratchPad, size) => {
  return computeCompletedItem({
    ...scratchPad,
    size
  });
}

const scratchPadReducer = (scratchPad = defaultScratchPad, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_SCRATCH:
      return addItemToScratch(scratchPad, item);

    case REMOVE_ITEM_FROM_SCRATCH:
      return removeItemFromScratch(scratchPad, item);

    case SET_SIZE_REQUIRED:
      return {
        ...scratchPad,
        sizeRequired: action.sizeRequired
      };

    case SET_ITEM_SIZE:
      return setItemSize(scratchPad, action.size);

    case SET_HALF_ORDERING:
      return {
        ...scratchPad,
        halfOrdering: action.halfOrdering
      };

    case RESET_SCRATCH:
      return defaultScratchPad;

    default:
      return scratchPad;
  }
}