import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const TagineGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SingleTaginePage({ data: { tagine } }) {
  return (
    <>
      <SEO title={tagine.name} image={tagine.image.asset.fluid.src} />
      <TagineGrid>
        <Img fluid={tagine.image.asset.fluid} />
        <div>
          <h2 className="mark">{tagine.name}</h2>
          <ul>
            {tagine.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </TagineGrid>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    tagine: sanityTagine(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
