import React from 'react';
import CategoryItems from './CategoryItems';
import QuickNavPanel from './QuickNavPanel';

const CategorySelection = () => {
  return (
    <div className="main-grid-cell category-selection">
      <CategoryItems />
      <QuickNavPanel />
    </div>
  );
}

export default CategorySelection;