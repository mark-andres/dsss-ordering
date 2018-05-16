import React from 'react';

export default () => {
  return (
    <div className="main-grid-cell order-ops">
      <div className="std-button grid-item-row1-col1">
        <p className="std-button-caption caption-color-red large-caption">Logoff</p>
      </div>
      <div className="std-button grid-item-row1-col2">
        <p className="std-button-caption caption-color-green large-caption">No Sale</p>
      </div>
      <div className="button-stack grid-item-row1-col3">
        <div className="std-button grid-item-row1-col1">
          <p className="std-button-caption medium-caption">{' '}Order Lookup</p>
        </div>
        <div className="std-button grid-item-row2-col1">
          <p className="std-button-caption medium-caption">Print</p>
        </div>
      </div>
      <div className="button-stack grid-item-row1-col4">
        <div className="std-button grid-item-row1-col1">
          <p className="std-button-caption medium-caption">Defer Order</p>
        </div>
        <div className="std-button grid-item-row2-col1">
          <p className="std-button-caption medium-caption caption-color-red">Exit</p>
        </div>
      </div>
      <div className="std-button grid-item-row1-col5">
        <p className="std-button-caption caption-color-gold large-caption">Send</p>
      </div>
      <div className="std-button grid-item-row1-col6">
        <p className="std-button-caption caption-color-green large-caption">Collect</p>
      </div>
    </div>
  );
}