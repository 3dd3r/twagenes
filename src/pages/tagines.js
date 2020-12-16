import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TagineList from '../components/TagineList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function TaginesPage({ data, pageContext }) {
  const tagines = data.tagines.nodes;
  console.log(pageContext.topping);
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Tagines with ${pageContext.topping}`
            : `All Tagines`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <TagineList tagines={tagines} />
    </>
  );
}

export const query = graphql`
  query TagineQuery($topping: [String]) {
    tagines: allSanityTagine(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
