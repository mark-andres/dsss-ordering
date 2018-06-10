import React from 'react';
import { connect } from 'react-redux';
import { sendOrder, removeItem } from '../actions/order';
import { restoreTopMenu } from '../actions/menu';

class ReceiptOperations extends React.Component {
  removeItem = () => {
    const { selectedItem, removeItem, restoreTopMenu } = this.props;

    if (selectedItem) {
      restoreTopMenu();
      removeItem(selectedItem);
    }
  }

  resetAll = () => {
    const { sendOrder, restoreTopMenu } = this.props;

    sendOrder();
    restoreTopMenu();
  }

  render() {
    return (
      <div className="main-grid-cell receipt-ops">
        <div 
          className="std-button grid-item-row1-col1"
          onClick={this.removeItem}
        >
          <p className="std-button-caption">Remove Item</p>
        </div>
        <div
          className="std-button grid-item-row1-col2"
          onClick={this.resetAll}
        >
          <p className="std-button-caption caption-color-green">Clear All</p>
        </div>
        <div className="std-button grid-item-row1-col3">
          <p className="std-button-caption">Quantity</p>
        </div>
        <div className="std-button grid-item-row2-col1">
          <p className="std-button-caption caption-color-red">Manager Functions</p>
        </div>
        <div className="std-button grid-item-row2-col2">
          <p className="std-button-caption">Order Note</p>
        </div>
        <div className="std-button grid-item-row2-col3">
          <p className="std-button-caption">Coupons</p>
        </div>
        <div className="std-button grid-item-row2-col4">
          <p className="std-button-caption">Repeat Item</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendOrder: () => dispatch(sendOrder()),
  restoreTopMenu: () => dispatch(restoreTopMenu()),
  removeItem: item => dispatch(removeItem(item))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptOperations);