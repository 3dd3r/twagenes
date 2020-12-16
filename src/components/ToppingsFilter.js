import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countTaginesInToppings(tagines) {
  const counts = tagines
    .map((tagine) => tagine.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is. Increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (x, y) => y.count - x.count
  );
  return sortedToppings;
}

function ToppingsFilter({ activeTopping }) {
  // List of all toppings
  const { toppings, tagines } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      tagines: allSanityTagine {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // Get a list of all the tagines with their toppings

  const toppingsWithCounts = countTaginesInToppings(tagines.nodes);

  return (
    <ToppingsStyles>
      <Link to="/tagines">
        <span>All</span>
        <span className="count">{tagines.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>{' '}
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

export default ToppingsFilter;
