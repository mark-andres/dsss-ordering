import React from 'react';

class CategoryItem extends React.Component {
  onClick = () => {
    alert(this.props.category);
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

export default CategoryItem;