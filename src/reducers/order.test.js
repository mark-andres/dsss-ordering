import orderReducer, {orderDefault} from './order';
import types, { ADD_ITEM, REMOVE_ITEM } from '../actions/types';
import { LARGE } from '../data';

describe('orderReducer', () => {
  it('should initialize an order', () => {
    expect(orderReducer(undefined, { type: '@@INIT'})).toEqual(orderDefault);    
  });

  describe('orderReducer: ADD_ITEM, REMOVE_ITEM', () => {
    let item;
    let order;

    beforeEach(() => {
      item = {
        description: 'Cheese Pizza',
        size: LARGE,
        price: 14.00,
        category: 'Pizza'
      };
      order = orderReducer(undefined, { type: ADD_ITEM, item });
    });

    it('should add an item to an empty order', () => {
      expect(order.items.length).toBe(1);
      expect(order.items[0]).toMatchObject(item);
      expect(order.selectedItem).toMatchObject(item);
      expect(order.items[0].id).toBeTruthy();
      expect(order.total).toBe(14);
    });

    it('should remove an item from an order', () => {
      order = orderReducer(order, { type: REMOVE_ITEM, item: order.selectedItem });
      expect(order.items.length).toBe(0);
      expect(order.selectedItem).toBe(null);
    });
  });

});