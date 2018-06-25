import React from 'react';
import OrderInfo from './OrderInfo';
import CategorySelection from './CategorySelection';
import OrderReceipt from './OrderReceipt';
import SelectionPanel from './SelectionPanel';
import ReceiptOperations from './ReceiptOperations';
import OrderOperations from './OrderOperations';
import ModalContainer from './ModalContainer';

const OrderEntry = () => {
  return (
    <React.Fragment>
      <div className="main-grid">
        <OrderInfo />
        <CategorySelection />
        <OrderReceipt />
        <SelectionPanel />
        <ReceiptOperations />
        <OrderOperations />
      </div>
      <ModalContainer />
    </React.Fragment>
  );
};

export default OrderEntry;