import calculTaginePrice from './calculTaginePrice';
import formatCurrency from './formatCurrency';

export default function attachNamesPrices(order, tagines) {
  return order.map((item) => {
    const tagine = tagines.find((tagine) => tagine.id === item.id);
    return {
      ...item,
      name: tagine.name,
      thumbnail: tagine.image.asset.fluid.src,
      price: formatCurrency(calculTaginePrice(tagine.price, item.size)),
    };
  });
}
