import React from 'react';
import { connect } from 'react-redux';
import { StandardButton } from './common/StandardButton';
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
        <StandardButton
          style={{gridRow: 1, gridColumn: 1}}
          onClick={this.removeItem}
        >
          Remove Item
        </StandardButton>
        <StandardButton
          style={{color: 'green', gridRow: 1, gridColumn: 2}}
          onClick={this.resetAll}
        >
          Clear All
        </StandardButton>
        <StandardButton 
          style={{gridRow: 1, gridColumn: 3}}
          onClick={this.changeQuantity}
        >
          Quantity
        </StandardButton>
        <StandardButton 
          style={{color: 'red', gridRow: 2, gridColumn: 1}}
        >
          Manager Functions
        </StandardButton>
        <StandardButton 
          style={{gridRow: 2, gridColumn: 2}}
        >
          Order Note
        </StandardButton>
        <StandardButton
          style={{gridRow: 2, gridColumn: 3}}
        >
          Coupons
        </StandardButton>
        <StandardButton
          style={{gridRow: 2, gridColumn: 4}}
          onClick={this.repeatItem}
        >
          Repeat Item
        </StandardButton>
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