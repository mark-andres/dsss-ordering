import React from 'react';
import { connect } from 'react-redux';

import { setCurrentMenu } from '../actions/menu';

class CategoryItem extends React.Component {
  onClick = () => {
    this.props.setCurrentMenu(this.props.menu);
  }

  render() {
    const { menu, isActive, row, column } = this.props;
    const rowColumn = `grid-item-row${row}-col${column}`;
    const specialClass = menu.caption.toLowerCase() + '-background';
    const classes = "category-item imaged-background";
    const active = isActive ? "category-item-selected" : "";

    return (
      <div 
        className={`${classes} ${active} ${specialClass} ${rowColumn}`}
        onClick={this.onClick}
      >
        <p>{menu.caption}</p>
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMenu: menu => dispatch(setCurrentMenu(menu))
  }
}

export default connect(null, mapDispatchToProps)(CategoryItem);