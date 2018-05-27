import React from 'react';
import CategoryItem from './CategoryItem';
import { connect } from 'react-redux';

class CategoryItems extends React.Component {
  renderMenuItems() {
    return this.props.menu.map(menuItem => (
      <CategoryItem
        menu={menuItem}
        isActive={this.props.categoryMenu.name === menuItem.name || false}
        row={menuItem.row}
        column={menuItem.column}
        key={menuItem.key}
      />
    ));
  }
  render() {
    return (
      <div className="category-items">

        {this.renderMenuItems()}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryMenu: state.menu.menuStack[0],
    menu: state.menu.menu
  }
};

export default connect(mapStateToProps, null)(CategoryItems);