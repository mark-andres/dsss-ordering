import React from 'react';
import { connect } from 'react-redux';
import { setNextChoice } from '../actions/app';
import { MenuItemButton } from './common/MenuItemButton';

class MenuItem extends React.Component {
  onClick = () => {
    const menuItem = this.props.menuItem;
    const item = {
      ...menuItem,
      key: this.key,
      quantity: 1,
    };

    this.props.setNextChoice(item);
  }

  render() {
    const menuItem = this.props.menuItem;
    let classes = 'menu-item';

    return (
      <MenuItemButton 
        className={classes}
        onClick={this.onClick}
      >
        {menuItem.name}
      </MenuItemButton>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setNextChoice: item => dispatch(setNextChoice(item))
});

export default connect(null, mapDispatchToProps)(MenuItem);