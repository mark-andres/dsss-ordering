import uuid from 'uuid/v1';
import types from '../actions/types';
import { CHEESE_PIZZA_PRICES, SPECIALTY_PIZZA_PRICES, PIZZA_SIZE } from '../data/menu';
import scratchPadReducer, { defaultScratchPad } from './scratchPad';

describe('scratchPadReducer tests', () => {
  let scratchPad;

  beforeEach(() => {
    scratchPad = scratchPadReducer(undefined, { type: '@@INIT' });
  });

  it('correctly initializes the scratch pad', () => {
    expect(scratchPad).toEqual(defaultScratchPad);
  });

  it('correctly adds a single item to a default scratch pad', () => {
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED, 
      size: false
    });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item: {
        name: 'Cannoli',
        key: uuid(),
        price: 3.00,
      }
    });

    expect(scratchPad.items.length).toBe(1);
    expect(scratchPad.completedItem).toBeTruthy();
  });

  it('correctly resets a scratch pad', () => {
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });

    expect(scratchPad.items.length).toBe(0);
    expect(scratchPad.sizeRequired).toBe(undefined);
    expect(scratchPad.halfOrdering).toBe(false);
    expect(scratchPad.completedItem).toBe(null);
  });

  it('correctly adds a sized item to a scratch pad', () => {
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED,
      sizeRequired: true
    });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item: {
        name: 'Cheese Pizza',
        key: uuid(),
        priceMatrix: CHEESE_PIZZA_PRICES
      }
    });

    expect(scratchPad.items.length).toBe(1);
    expect(scratchPad.completedItem).toBeFalsy();

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_ITEM_SIZE,
      size: PIZZA_SIZE.LARGE
    });

    expect(scratchPad.completedItem.name).toEqual('Large Cheese Pizza');
    expect(scratchPad.completedItem.price).toBe(14);
  });

  it('correctly adds an item that then gets sized to a scratch pad', () => {
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED,
      sizeRequired: true
    });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_ITEM_SIZE,
      size: PIZZA_SIZE.MEDIUM
    });

    expect(scratchPad.completedItem).toBeFalsy();

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item: {
        name: 'Deluxe Pizza',
        key: uuid(),
        priceMatrix: SPECIALTY_PIZZA_PRICES
      }
    });

    expect(scratchPad.completedItem.name).toEqual('Medium Deluxe Pizza');
    expect(scratchPad.completedItem.price).toBe(18);
  });


  it('correctly creates a half and half completed item', () => {
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED,
      sizeRequired: true
    });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_ITEM_SIZE,
      size: PIZZA_SIZE.SMALL
    });

    expect(scratchPad.size).toBe(PIZZA_SIZE.SMALL);

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_HALF_ORDERING,
      halfOrdering: true
    });

    expect(scratchPad.halfOrdering).toBe(true);

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item: {
        name: 'Supreme Pizza',
        conciseName: 'Supreme',
        key: uuid(),
        priceMatrix: SPECIALTY_PIZZA_PRICES
      }
    });

    expect(scratchPad.items.length).toBe(1);

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item: {
        name: 'Cheese Pizza',
        conciseName: 'Cheese',
        key: uuid(),
        priceMatrix: CHEESE_PIZZA_PRICES
      }
    });

    expect(scratchPad.items.length).toBe(2);
    expect(scratchPad.completedItem).toBeTruthy();
    expect(scratchPad.completedItem.price).toBe(13);
    expect(scratchPad.completedItem.name).toBe('Small H1-Supreme/H2-Cheese');
  });

  it('correctly adds and removes an item', () => {
    const item = {
      name: 'Supreme Pizza',
      conciseName: 'Supreme',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES
    };
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED,
      sizeRequired: true
    });

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.ADD_ITEM_TO_SCRATCH,
      item
    });

    expect(scratchPad.items.length).toBe(1);
    expect(scratchPad.completedItem).toBe(null);

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.REMOVE_ITEM_FROM_SCRATCH,
      item
    });

    expect(scratchPad.items.length).toBe(0);
  });

  it('correctly toggles an item', () => {
    const item = {
      name: 'Supreme Pizza',
      conciseName: 'Supreme',
      key: uuid(),
      priceMatrix: SPECIALTY_PIZZA_PRICES
    };
    scratchPad = scratchPadReducer(scratchPad, { type: types.RESET_SCRATCH });
    scratchPad = scratchPadReducer(scratchPad, {
      type: types.SET_SIZE_REQUIRED,
      sizeRequired: true
    });

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.TOGGLE_ITEM_IN_SCRATCH,
      item
    });

    expect(scratchPad.items.length).toBe(1);
    expect(scratchPad.completedItem).toBe(null);

    scratchPad = scratchPadReducer(scratchPad, {
      type: types.TOGGLE_ITEM_IN_SCRATCH,
      item 
    });

    expect(scratchPad.items.length).toBe(0);
  });
});
