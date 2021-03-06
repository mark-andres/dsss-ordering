import orderReducer, {orderDefault} from './order';
import types, { ADD_ITEM, REMOVE_ITEM, CHANGE_ITEM, ADD_MODIFIER, REMOVE_MODIFIER } from '../actions/types';
import { LARGE, MEDIUM } from '../data';

describe('orderReducer', () => {
  it('should initialize an order', () => {
    expect(orderReducer(undefined, { type: '@@INIT'})).toEqual(orderDefault);    
  });

  describe('orderReducer: ADD_ITEM, REMOVE_ITEM', () => {
    let item;
    let order;

    beforeEach(() => {
      item = {
        name: 'Cheese Pizza',
        size: LARGE,
        price: 14.00,
        category: 'Pizza', 
        quantity: 1
      };
      order = orderReducer(undefined, { type: ADD_ITEM, item });
    });

    it('should add an item to an empty order', () => {
      expect(order.items.length).toBe(1);
      expect(order.items[0]).toMatchObject(item);
      expect(order.selectedItem).toMatchObject(item);
      expect(order.total).toBe(14);
    });

    it('should update an item', () => {
      const item = {
        ...order.selectedItem,
        size: MEDIUM,
        price: 12.00,
        quantity: 1
      }
      order = orderReducer(order, { type: CHANGE_ITEM, item });
      expect(order.items.length).toBe(1);
      expect(order.items[0].price).toBe(item.price);
      expect(order.items[0].size).toBe(MEDIUM);
      expect(order.items[0].id).toEqual(order.selectedItem.id);
      expect(order.total).toBe(item.price);
    });

    it('should remove an item from an order', () => {
      order = orderReducer(order, { type: REMOVE_ITEM, item: order.selectedItem });
      expect(order.items.length).toBe(0);
      expect(order.selectedItem).toBe(null);
    });

    it('should correctly total prices from multiple items', () => {
      order = orderReducer(order, { type: ADD_ITEM, item });
      order = orderReducer(order, { type: ADD_ITEM, item });
      order = orderReducer(order, { type: ADD_ITEM, item });
      expect(order.items.length).toBe(4);
      expect(order.total).toBe(item.price * 4);
    });

  });

});