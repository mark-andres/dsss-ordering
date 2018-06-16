import React from 'react';
import { connect } from 'react-redux';
import ItemsMenu from './ItemsMenu';
import ModifiersMenu from './ModifiersMenu';
import ChoicesMenu from './ChoicesMenu';
import SizesMenu from './SizesMenu';
import { MENU_TYPE } from '../data/menu';

class SelectionPanel extends React.Component {
  render() {
    switch (this.props.currentMenu.type) {
      case MENU_TYPE.ITEMS_MENU:
        return <ItemsMenu menu={this.props.currentMenu} />;

      case MENU_TYPE.MODIFIERS_MENU:
        return <ModifiersMenu menu={this.props.currentMenu} />;

      case MENU_TYPE.CHOICES_MENU:
        return <ChoicesMenu menu={this.props.currentMenu} />;

      case MENU_TYPE.SIZES_MENU:
        return <SizesMenu menu={this.props.currentMenu} />;

      default:
        return <h1>Unknown Menu Type</h1>
    }
  }
}

const mapStateToProps = state => ({
  currentMenu: state.menu.currentMenu
});

export default connect(mapStateToProps, null)(SelectionPanel);