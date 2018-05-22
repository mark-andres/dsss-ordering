import React from 'react';
import { connect } from 'react-redux';
import { setCurrentMenu } from '../actions/menu';
import { setSelectedItem } from '../actions/order';
import { selectedItemStyle } from '../styles/LineItem';

class LineItem extends React.Component {
  onClick = () => {
    this.props.setCurrentMenu(this.props.item.menu);
    this.props.setSelectedItem(this.props.item);
  }

  render() {
    const { item } = this.props;

    if (!item) {
      return <tr><td></td><td></td><td></td></tr>;
    }

    const { quantity, name, price } = item;
    const quantityStr = quantity ? quantity.toString() : '';
    const priceStr = price ? price.toFixed(2) : '';
    const selectedItem = this.props.selectedItem;
    const style = (selectedItem && selectedItem.id === item.id) ? selectedItemStyle : {};

    return (
      <tr onClick={this.onClick} style={style}>
        <td>{quantityStr}</td>
        <td>{name}</td>
        <td>{priceStr}</td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentMenu: menu => dispatch(setCurrentMenu(menu)),
  setSelectedItem: item => dispatch(setSelectedItem(item))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);