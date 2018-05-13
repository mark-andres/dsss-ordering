import React from 'react';
import CategoryItem from './CategoryItem';
import categories from '../data/categories';

class CategoryItems extends React.Component {
  renderCategories() {
    return categories.map(category => (
      <CategoryItem
        category={category.category}
        isActive={category.isActive}
        row={category.row}
        column={category.column}
        key={`${category.category}${category.row}${category.column}`}
      />
    ));
  }
  render() {
    return (
      <div className="category-items">

        {this.renderCategories()}

      </div>
    );
  }
}

export default CategoryItems;