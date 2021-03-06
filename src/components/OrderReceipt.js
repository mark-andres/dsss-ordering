import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import LineItem from './LineItem';
import { getFormattedModifiers } from '../selectors/modifiers';

class OrderReceipt extends React.Component {
  renderItemNotes(notes, item) {
    return notes.map(note => {
      return <LineItem isNote={true} key={uuid()} item={{ name: note }} subItemOwner={item} />;
    });
  }

  renderSubItems(subItemList, item) {
    return subItemList.map((subItem, index) => {
      const { name, price, add } = subItem;
      return <LineItem isSubItem={true} key={uuid()} item={{ name, price, add }} subItemOwner={item} subItemIndex={index} />;
    });
  }

  renderModifiers(formattedModifiers, item) {
    return formattedModifiers.map(subItem => {
      const { name, modifier } = subItem;
      const { price } = modifier;
      return <LineItem isSubItem={true} key={uuid()} item={{ name, price }} subItemOwner={item} />;
    });
  }

  renderLineItems(order) {
    const lineItems = order.items.map(item => {
      const halfOrdering = _.property('scratchPad.halfOrdering')(item);
      const formattedModifiers = getFormattedModifiers(item.modifiers, !halfOrdering);
      let subItemLines = [], commentLines = [], modifierLines = [];

      if (item.notes) {
        commentLines = this.renderItemNotes(item.notes, item);
      }
      if (item.subItems) {
        subItemLines = this.renderSubItems(item.subItems, item);
      }
      if (item.modifiers) {
        modifierLines = this.renderModifiers(formattedModifiers, item);
      }

      return [
        <LineItem isSubItem={false} key={item.id} item={item} />,
        ...commentLines, ...subItemLines, ...modifierLines 
      ];
    });

    const flatItems = _.flatten(lineItems);
    return flatItems;
  }

  renderOrderNotes(order) {
    return order.notes.map((note, index) => {
      return <LineItem isSubItem={false} key={uuid()} item={{ name: note }} noteIndex={index} />;
    });
  }

  render() {
    const order = this.props.order;
    const header =
      <thead>
        <tr>
          <th>Qty</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>;

    return (
      <div className="main-grid-cell order-receipt">
        <table>
          {header}
          <tbody>
            <tr>
              <td colSpan="3">
                <div className="order-receipt-body">
                  <table>
                    <tbody>
                      {this.renderOrderNotes(order)}
                      {this.renderLineItems(order)}
                      <LineItem key={uuid()} />
                      {order.items.length > 0 && (
                        <tr key={uuid()} className="receipt-summary-line">
                          <td></td>
                          <td><span className="receipt-summary-item">Subtotal</span></td>
                          <td>{order.subtotal.toFixed(2)}</td>
                        </tr>
                      )}
                      {order.items.length > 0 && (
                        <tr key={uuid()} className="receipt-summary-line">
                          <td></td>
                          <td><span className="receipt-summary-item">Tax</span></td>
                          <td>{order.tax.toFixed(2)}</td>
                        </tr>
                      )}
                      {order.items.length > 0 && (
                        <tr key={uuid()} className="receipt-summary-line">
                          <td></td>
                          <td><span className="receipt-summary-item">Total</span></td>
                          <td>{order.total.toFixed(2)}</td>
                        </tr>
                      )}
                      <LineItem key={uuid()} />
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order
  }
};

export default connect(mapStateToProps, null)(OrderReceipt);