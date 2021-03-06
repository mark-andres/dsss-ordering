import React from 'react';
import { connect } from 'react-redux';

import { makeTopMenuCurrentMenu } from '../actions/menu';

class CategoryItem extends React.Component {
  onClick = () => {
    this.props.setCurrentMenu(this.props.menu);
  }

  render() {
    const { menu, isActive, row, column } = this.props;
    const specialClass = menu.caption.toLowerCase() + '-background';
    const classes = "category-item imaged-background";
    const active = isActive ? "category-item-selected" : "";

    return (
      <div 
        style={{gridRow: row, gridColumn: column}}
        className={`${classes} ${active} ${specialClass}`}
        onClick={this.onClick}
      >
        <p>{menu.caption}</p>
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMenu: menu => dispatch(makeTopMenuCurrentMenu(menu))
  }
}

export default connect(null, mapDispatchToProps)(CategoryItem);