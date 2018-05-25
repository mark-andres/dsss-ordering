import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/order';
import { toggleItemInScratch, resetScratch } from '../actions/scratchPad';
import uuid from 'uuid/v1';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.key = uuid();
  }

  isSet() {
    const { scratchPad } = this.props;
    const { items } = scratchPad;

    if (items.length === 0) {
      return false;
    }

    return !!(items.find(item => item.key === this.key));
  }
  
  onClick = () => {
    const menuItem = this.props.menuItem;
    const item = {
      ...menuItem,
      key: this.key,
      quantity: 1,
    };
    this.props.toggleItem(item);

    // if (this.props.scratchPad.completedItem) {
    //   this.props.addItem(this.props.scratchPad.completedItem);
    //   this.props.resetScratch();
    // }
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
  toggleItem: item => dispatch(toggleItemInScratch(item)),
  resetScratch: () => dispatch(resetScratch()),
  addItem: item => dispatch(addItem(item))
});

const mapStateToProps = state => ({
  scratchPad: state.scratchPad
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);