import React from 'react';
import { connect } from 'react-redux';
import { toggleItemInScratch } from '../actions/scratchPad';
import uuid from 'uuid/v1';
import { MenuItemButton } from './common/MenuItemButton';
import { orderItemFromMenu } from '../lib';
import { loadModal } from '../actions/modal';
import { QUANTITY_DIALOG } from './modals/QuantityDialog';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.key = uuid();
  }

  isSet() {
    const items = this.props.scratchPadItems;

    if (items.length === 0) {
      return false;
    }

    return !!(items.find(item => item.key === this.key));
  }
  
  onClick = () => {
    const { modifiers } = this.props.menu;
    if (this.props.menuItem.pricePrompt) {
      this.props.loadModal(QUANTITY_DIALOG, {
        enterAmount: true,
        onOk: amount => {
          this.props.toggleItem(
            orderItemFromMenu({
              ...this.props.menuItem,
              price: amount,
              key: this.key,
              menu: modifiers ? modifiers : this.props.menu
            }, 1)
          );
        }
      });
    } else {
      this.props.toggleItem(
        orderItemFromMenu({
          ...this.props.menuItem,
          key: this.key,
          menu: modifiers ? modifiers : this.props.menu
        }, 1)
      );
    }
  }

  render() {
    const menuItem = this.props.menuItem;

    return (
      <MenuItemButton 
        active={this.isSet()}
        onClick={this.onClick}
      >
        {menuItem.name}
      </MenuItemButton>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleItem: item => dispatch(toggleItemInScratch(item)),
  loadModal: (modalType, modalProps) => dispatch(loadModal(modalType, modalProps))
});

const mapStateToProps = state => ({
  scratchPadItems: state.scratchPad.items
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);