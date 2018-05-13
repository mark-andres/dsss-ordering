import React from 'react';

export default () => {
  return (
    <div className="main-grid-cell receipt-ops">
      <div className="std-button grid-item-row1-col1">
        <p className="std-button-caption">Remove Item</p>
      </div>
      <div className="std-button grid-item-row1-col2">
        <p className="std-button-caption caption-color-green">Clear All</p>
      </div>
      <div className="std-button grid-item-row1-col3">
        <p className="std-button-caption">Quantity</p>
      </div>
      <div className="std-button grid-item-row2-col1">
        <p className="std-button-caption caption-color-red">Manager Functions</p>
      </div>
      <div className="std-button grid-item-row2-col2">
        <p className="std-button-caption">Order Note</p>
      </div>
      <div className="std-button grid-item-row2-col3">
        <p className="std-button-caption">Coupons</p>
      </div>
      <div className="std-button grid-item-row2-col4">
        <p className="std-button-caption">Repeat Item</p>
      </div>
    </div>
  );
}