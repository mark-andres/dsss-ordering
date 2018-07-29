import React from 'react';
import { connect } from 'react-redux';
import { setCurrentMenu } from '../actions/menu';
import { setSelectedItem } from '../actions/order';
import { resetScratch } from '../actions/scratchPad';
import { selectedItemStyle } from '../styles/LineItem';
import { isEmpty } from '../lib';

class LineItem extends React.Component {
  onClick = () => {
    const { setCurrentMenu, setSelectedItem, resetScratch } = this.props;
    const { isSubItem, isNote, subItemOwner, item } = this.props;
    const targetItem = isSubItem ? subItemOwner : item;

    setCurrentMenu(targetItem.menu);
    resetScratch(targetItem.scratchPad);
    setSelectedItem(targetItem);
  }

  render() {
    const { item, selectedItem, isSubItem, isNote, subItemOwner, noteIndex } = this.props;

    if (!item) {
      return <tr><td></td><td></td><td></td></tr>;
    }

    const { quantity, name, price, add } = item;
    let quantityStr = quantity ? quantity.toString() : '';
    let priceStr;

    const style = (!isEmpty(selectedItem) && selectedItem.id === item.id) ? selectedItemStyle : {};
    let subItemStyle = {};

    if (isSubItem) {
      quantityStr = '';
      priceStr = price ? (subItemOwner.quantity * price).toFixed(2) : '';
      subItemStyle = { paddingLeft: '2vw' };
    } else if (isNote) {
      priceStr = '';
      quantityStr = '';
      if (noteIndex) {
        subItemStyle = { color: 'green' };
      } else {
        subItemStyle = { paddingLeft: '1vw', color: 'green' };
      }
    } else {
      priceStr = (quantity * price).toFixed(2);
    }

    return (
      <React.Fragment>
        <tr onClick={this.onClick} style={style}>
          <td>{quantityStr}</td>
          <td style={subItemStyle}>{name}</td>
          <td>{priceStr}</td>
        </tr>
        {!!add && (
          <tr onClick={this.onClick} style={style}>
            <td></td>
            <td style={subItemStyle}>{add}</td>
            <td></td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentMenu: menu => dispatch(setCurrentMenu(menu)),
  setSelectedItem: item => dispatch(setSelectedItem(item)),
  resetScratch: scratchPad => dispatch(resetScratch(scratchPad))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);