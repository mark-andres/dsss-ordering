import React from 'react';
import { connect } from 'react-redux';
import { sendOrder, changeItem, removeItem, copyItem } from '../actions/order';
import { restoreTopMenu } from '../actions/menu';
import { loadModal } from '../actions/modal';
import { MESSAGE_MODAL } from './MessageModal';
import { CONFIRM_DIALOG } from './ConfirmDialog';
import { QUANTITY_DIALOG } from './QuantityDialog';

class ReceiptOperations extends React.Component {
  repeatItem = () => {
    const { selectedItem, copyItem } = this.props;

    if (selectedItem) {
      copyItem(selectedItem);
    }
  }

  removeItem = () => {
    const { selectedItem, removeItem, restoreTopMenu } = this.props;

    if (selectedItem) {
      this.props.loadModal(CONFIRM_DIALOG, {
        message: 'Would you like to remove the selected item?',
        onYes: () => {
          restoreTopMenu();
          removeItem(selectedItem);
        }
      });
    } else {
      this.props.loadModal(MESSAGE_MODAL, { message: 'No item has been selected.' });
    }
  }

  resetAll = () => {
    const { sendOrder, restoreTopMenu, loadModal } = this.props;

    loadModal(CONFIRM_DIALOG, {
      message: 'Would you like to clear all items?',
      onYes: () => {
        sendOrder();
        restoreTopMenu();
      }
    });
  }

  changeQuantity = () => {
    const { selectedItem, changeItem, loadModal } = this.props;

    if (selectedItem) {
      loadModal(QUANTITY_DIALOG, {
        onOk: quantity => {
          changeItem({
            ...selectedItem,
            quantity
          });
        }
      });
    } else {
      this.props.loadModal(MESSAGE_MODAL, { message: 'No item has been selected.' });
    }
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
        <div 
          className="std-button grid-item-row1-col3"
          onClick={this.changeQuantity}
        >
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
        <div
          className="std-button grid-item-row2-col4"
          onClick={this.repeatItem}
        >
          <p className="std-button-caption">Repeat Item</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendOrder: () => dispatch(sendOrder()),
  restoreTopMenu: () => dispatch(restoreTopMenu()),
  changeItem: item => dispatch(changeItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  copyItem: item => dispatch(copyItem(item)),
  loadModal: (modalType, modalProps) => dispatch(loadModal(modalType, modalProps))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptOperations);