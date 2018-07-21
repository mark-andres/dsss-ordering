import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toggleItemInScratch } from '../actions/scratchPad';
import uuid from 'uuid/v1';
import { MenuItemButton } from './common/MenuItemButton';
import { orderItemFromMenu } from '../lib';
import { loadModal } from '../actions/modal';
import { QUANTITY_DIALOG } from './modals/QuantityDialog';
import { getTopMenu } from '../data/menu';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.key = uuid();
  }

  isSet() {
    const { items, sizeRequired } = this.props.scratchPad;

    if (items.length === 0 || !sizeRequired) {
      return false;
    }

    return !!(items.find(item => item.key === this.key));
  }

  getMenuRef(menu) {
    const menuRef = [];
    menuRef[0] = _.findKey(getTopMenu(), { name: menu.name });
    if (menu.modifiers) {
      menuRef[1] = 'modifiers';
    }
    return menuRef;
  }
  
  onClick = () => {
    if (this.props.menuItem.pricePrompt) {
      this.props.loadModal(QUANTITY_DIALOG, {
        enterAmount: true,
        onOk: amount => {
          this.props.toggleItem(
            orderItemFromMenu({
              ...this.props.menuItem,
              price: amount,
              key: this.key,
              menu: this.getMenuRef(this.props.menu)
            }, 1)
          );
        }
      });
    } else {
      this.props.toggleItem(
        orderItemFromMenu({
          ...this.props.menuItem,
          key: this.key,
          menu: this.getMenuRef(this.props.menu)
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
  scratchPad: state.scratchPad
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);