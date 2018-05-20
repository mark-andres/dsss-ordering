import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

class SelectionPanel extends React.Component {
  render() {
    const menuItems = this.props.currentMenu.items.map(menuItem => {
      return <MenuItem key={menuItem.key} menuItem={menuItem} />;
    });

    return (
      <div className="main-grid-cell selection-panel">
        <div className="selectionMenu">
          <h1>{this.props.currentMenu.name + ' Menu'}</h1>
          {menuItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMenu: state.menu.currentMenu
});

export default connect(mapStateToProps, null)(SelectionPanel);