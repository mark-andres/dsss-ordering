import React from 'react';

export default () => {
  return (
    <div className="main-grid-cell order-receipt">
      <table>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Large Cheese Pizza</td>
            <td>14.00</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Medium Deluxe Pizza</td>
            <td>14.00</td>
          </tr>
          <tr><td></td><td></td><td></td></tr>
          <tr className="receipt-summary-line">
            <td></td>
            <td><span className="receipt-summary-item">Subtotal</span></td>
            <td>28.00</td>
          </tr>
          <tr className="receipt-summary-line">
            <td></td>
            <td><span className="receipt-summary-item">Tax</span></td>
            <td>0.00</td>
          </tr>
          <tr className="receipt-summary-line">
            <td></td>
            <td><span className="receipt-summary-item">Total</span></td>
            <td>28.00</td>
          </tr>
          <tr><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>
  );
}