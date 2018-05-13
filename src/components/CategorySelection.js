import React from 'react';
import CategoryItems from './CategoryItems';
import PlaceholderPanel from './PlaceholderPanel';

export default () => {
  return (
    <div className="main-grid-cell category-selection">
      <CategoryItems />
      <PlaceholderPanel />
    </div>
  );
}