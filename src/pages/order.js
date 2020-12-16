import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculTaginePrice from '../utils/calculTaginePrice';
import formatCurrency from '../utils/formatCurrency';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import useTagine from '../utils/useTagine';
import TagineOrder from '../components/TagineOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const tagines = data.tagines.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    address: '',
    huney: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useTagine({
    tagines,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <div>
      <SEO title="Order a Tagine!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={values.address}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <TagineOrder
            order={order}
            removeFromOrder={removeFromOrder}
            tagines={tagines}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {tagines.map((tagine) => (
            <MenuItemStyles key={tagine.id}>
              <Img
                width="50"
                height="50"
                fluid={tagine.image.asset.fluid}
                alt={tagine.name}
              />
              <div>
                <h3>{tagine.name}</h3>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: tagine.id,
                        size,
                      })
                    }
                  >
                    {size}
                    {formatCurrency(calculTaginePrice(tagine.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>

        <fieldset>
          <h3>
            Your Total is {formatCurrency(calculateOrderTotal(order, tagines))}
          </h3>
          <div>{error ? <p>Error: {error} </p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Now!'}
          </button>
        </fieldset>
      </OrderStyles>
    </div>
  );
}

export const query = graphql`
  query {
    tagines: allSanityTagine {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
