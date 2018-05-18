import React from 'react';
import CategoryItem from './CategoryItem';
import { connect } from 'react-redux';
// import categories from '../data/categories';

class CategoryItems extends React.Component {
  renderCategories() {
    return this.props.categories.map(category => (
      <CategoryItem
        category={category.category}
        isActive={this.props.currentCategory.category === category.category || false}
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

const mapStateToProps = state => {
  return {
    categories: state.menuCategories.categories,
    currentCategory: state.menuCategories.currentCategory
  }
};

export default connect(mapStateToProps, null)(CategoryItems);