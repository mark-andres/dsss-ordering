import React from 'react';

export default () => {
  return (
    <div className="main-grid-cell order-info">
      <div className="order-info-header">
        <span id="order-no-label">Order #: </span>
        <span id="order-no">{' '}New</span>
      </div>
    </div>
  );
}