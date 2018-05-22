import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/order';

class MenuItem extends React.Component {
  onClick = () => {
    const menuItem = this.props.menuItem;
    const size = 'Large';
    const item = {
      name: menuItem.name,
      size,
      quantity: 1,
      menu: this.props.currentMenu
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

const mapStateToProps = state => ({
  currentMenu: state.menu.currentMenu
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);