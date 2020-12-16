import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculTaginePrice from '../utils/calculTaginePrice';
import formatCurrency from '../utils/formatCurrency';

export default function TagineOrder({ order, tagines, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const tagine = tagines.find((tagine) => tagine.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={tagine.image.asset.fluid} />
            <h2>{tagine.name}</h2>
            <p>
              {formatCurrency(
                calculTaginePrice(tagine.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${tagine.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
