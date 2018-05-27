import React from 'react';
import { connect } from 'react-redux';
import { toggleItemInScratch } from '../actions/scratchPad';
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
  scratchPad: state.scratchPad
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);