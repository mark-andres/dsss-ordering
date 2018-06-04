import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import LineItem from './LineItem';

class OrderReceipt extends React.Component {
  renderLineItems(order) {
    const lineItems = order.items.map(item => {
      let subItems = [];
      if (item.subItems) {
        subItems = item.subItems.map(subItem => {
          const { name, price } = subItem;
          return <LineItem isSubItem={true} key={uuid()} item={{name, price}} />;
        });
      }

      return [<LineItem isSubItem={false} key={item.id} item={item} />, ...subItems];
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
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
});

export default connect(mapStateToProps, null)(OrderReceipt);