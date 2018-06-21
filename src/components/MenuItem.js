import React from 'react';
import { connect } from 'react-redux';
import { toggleItemInScratch } from '../actions/scratchPad';
import uuid from 'uuid/v1';
import { MenuItemButton } from './common/MenuItemButton';
import { orderItemFromMenu } from '../lib';

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
    this.props.toggleItem(
      orderItemFromMenu({
        ...this.props.menuItem,
        key: this.key,
        menu: modifiers ? modifiers : this.props.menu
      }, 1)
    );
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
  toggleItem: item => dispatch(toggleItemInScratch(item))
});

const mapStateToProps = state => ({
  scratchPadItems: state.scratchPad.items
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);