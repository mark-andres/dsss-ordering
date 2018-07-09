import React from 'react';
import OrderInfo from './OrderInfo';
import CategorySelection from './CategorySelection';
import OrderReceipt from './OrderReceipt';
import SelectionPanel from './SelectionPanel';
import ReceiptOperations from './ReceiptOperations';
import OrderOperations from './OrderOperations';

const OrderEntry = () => {
  return (
      <div className="main-grid">
        <OrderInfo />
        <CategorySelection />
        <OrderReceipt />
        <SelectionPanel />
        <ReceiptOperations />
        <OrderOperations />
      </div>
  );
};

export default OrderEntry;