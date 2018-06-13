import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import LineItem from './LineItem';

class OrderReceipt extends React.Component {
  renderComments(comments, item) {
    return comments.map(comment => {
      const { name } = comment;
      return <LineItem isComment={true} key={uuid()} item={{ name }} subItemOwner={item}/>;
    });
  }

  renderSubItems(subItemList, item) {
    return subItemList.map(subItem => {
      const { name, price } = subItem;
      return <LineItem isSubItem={true} key={uuid()} item={{ name, price }} subItemOwner={item}/>;
    });
  }

  renderModifiers(modifiers, item) {
    const modifiersList = modifiers.reduce((newList, modifier) => {
      if (modifier.flags && modifier.flags.default && modifier.flags.negated) {
        return newList.concat({ name: 'NO ' + modifier.name });
      } else if (modifier.flags && !modifier.flags.default){
        return newList.concat(modifier);
      } else {
        return newList;
      }
    }, []);

    return modifiersList.map(subItem => {
      const { name, price } = subItem;
      return <LineItem isSubItem={true} key={uuid()} item={{ name, price }} subItemOwner={item}/>;
    });
  }

  renderLineItems(order) {
    const lineItems = order.items.map(item => {
      let subItems, modifiers, modifiersH1, modifiersH2, comments;
      subItems = modifiers = modifiersH1 = modifiersH2 = comments = [];

      if (item.comments) {
        comments = this.renderComments(item.comments, item);
      }
      if (item.subItems) {
        subItems = this.renderSubItems(item.subItems, item);
      }
      if (item.modifiers) {
        modifiers = this.renderModifiers(item.modifiers, item);
      }
      if (item.modifiersH1) {
        modifiersH1 = this.renderModifiers(item.modifiersH1, item);
      }
      if (item.modifiersH2) {
        modifiersH2 = this.renderModifiers(item.modifiersH2, item);
      }

      return [
        <LineItem isSubItem={false} key={item.id} item={item} />,
        ...comments, ...subItems, ...modifiers, ...modifiersH1, ...modifiersH2
      ];
    });

    const flatItems = _.flatten(lineItems);
    return flatItems;
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

const mapStateToProps = state => ({
  order: state.order,
});

export default connect(mapStateToProps, null)(OrderReceipt);