import React from 'react';
import CategoryItems from './CategoryItems';
import PlaceholderPanel from './PlaceholderPanel';

const CategorySelection = () => {
  return (
    <div className="main-grid-cell category-selection">
      <CategoryItems />
      <PlaceholderPanel />
    </div>
  );
}

export default CategorySelection;