import React from 'react';
import { connect } from 'react-redux';

import { setCurrentCategory } from '../actions/categories';

class CategoryItem extends React.Component {
  onClick = () => {
    const { category, row, column } = this.props;

    this.props.setCurrentCategory({ category, isActive: true, row, column });
  }

  render() {
    const { category, isActive, row, column } = this.props;
    const rowColumn = `grid-item-row${row}-col${column}`;
    const specialClass = category.toLowerCase() + '-background';
    const classes = "category-item imaged-background";
    const active = isActive ? "category-item-selected" : "";

    return (
      <div 
        className={`${classes} ${active} ${specialClass} ${rowColumn}`}
        onClick={this.onClick}
      >
        <p>{category}</p>
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCategory: category => dispatch(setCurrentCategory(category))
  }
}

export default connect(null, mapDispatchToProps)(CategoryItem);