import React, { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesPrices from './attachNamesPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatCurrency from './formatCurrency';

export default function useTagine({ tagines, values }) {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addToOrder(orderedTagine) {
    setOrder([...order, orderedTagine]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('Success! The invoice has been sent to your email.');
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
