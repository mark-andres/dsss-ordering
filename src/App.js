import React, { Component } from 'react';
import './App.css';
import OrderInfo from './components/OrderInfo';
import CategorySelection from './components/CategorySelection';
import OrderReceipt from './components/OrderReceipt';
import SelectionPanel from './components/SelectionPanel';
import ReceiptOperations from './components/ReceiptOperations';
import OrderOperations from './components/OrderOperations';

class App extends Component {
  render() {
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
  }
}

export default App;
