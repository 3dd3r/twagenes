import React from 'react';
import calculTaginePrice from './calculTaginePrice';

function calculateOrderTotal(order, tagines) {
  const total = order.reduce((runningTotal, singleOrder) => {
    const tagine = tagines.find((tagine) => tagine.id === singleOrder.id);
    return runningTotal + calculTaginePrice(tagine.price, singleOrder.size);
  }, 0);
  return total;
}

export default calculateOrderTotal;
