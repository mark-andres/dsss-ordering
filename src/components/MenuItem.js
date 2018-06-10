import React from 'react';
import { connect } from 'react-redux';
import { toggleItemInScratch } from '../actions/scratchPad';
import uuid from 'uuid/v1';
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
    let classes = 'menu-item';

    if (this.isSet()) {
      classes += ' menu-item-set';
    }

    return (
      <div 
        className={classes}
        onClick={this.onClick}
      >
        <p>{menuItem.name}</p>
      </div>
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