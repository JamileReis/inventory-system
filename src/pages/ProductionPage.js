import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { fetchProductionSuggestion } from '../store/productionSlice';

function ProductionPage() {
  const dispatch = useDispatch();
  const { suggestion } = useSelector(state => state.production);

  useEffect(() => {
    dispatch(fetchProductionSuggestion());
  }, [dispatch]);

  return (
    <>
      <div className="page-header">
        <h2>Production Suggestion</h2>
        <Button onClick={() => dispatch(fetchProductionSuggestion())}>🔄 Refresh</Button>
      </div>

      {suggestion && suggestion.suggestedProductions && suggestion.suggestedProductions.length > 0 ? (
        <>
          <div className="card-table">
            <Table hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Value</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {suggestion.suggestedProductions.map(item => (
                  <tr key={item.productId}>
                    <td><strong>{item.productName}</strong></td>
                    <td>${item.productValue}</td>
                    <td>{item.quantityToProduce}</td>
                    <td><strong>${item.totalValueForProduct}</strong></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="total-box">
            <p className="mb-1">Total Production Value</p>
            <h4 className="mb-0">${suggestion.totalValue}</h4>
          </div>
        </>
      ) : (
        <Alert variant="info">No suggestions. Add products, raw materials and compositions first.</Alert>
      )}
    </>
  );
}

export default ProductionPage;
