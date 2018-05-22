import React from 'react';

const OrderInfo = () => {
  return (
    <div className="main-grid-cell order-info">
      <div className="order-info-header">
        <span id="order-no-label">Order #: </span>
        <span id="order-no">{' '}New</span>
      </div>
    </div>
  );
}

export default OrderInfo;