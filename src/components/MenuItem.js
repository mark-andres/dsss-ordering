import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/order';

class MenuItem extends React.Component {
  onClick = () => {
    const menuItem = this.props.menuItem;
    const size = 'Large';
    const item = {
      description: menuItem.name,
      size,
    };
    if (menuItem.priceMatrix) {
      item.price = menuItem.priceMatrix[size];
    } else if (menuItem.price) {
      item.price = menuItem.price;
    }
    this.props.addItem(item);
  }

  render() {
      const menuItem = this.props.menuItem;    

      return <p onClick={this.onClick}>{menuItem.name}</p>;
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(MenuItem);