import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from './Pagination';
import SEO from '../components/SEO';

const TwagensGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const TwagenStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h3 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

function TwagensPage({ data, pageContext }) {
  const twagens = data.twagens.nodes;
  return (
    <>
      <SEO title=" Our Twagens" />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Our based Twagens who make the best tagines
      </h1>
      <TwagensGrid>
        {twagens.map((person) => (
          <TwagenStyles key={person.id}>
            <Link to={`/twagens/${person.slug.current}`}>
              <h3>
                <span className="mark">{person.name}</span>
              </h3>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </TwagenStyles>
        ))}
      </TwagensGrid>
      {/* </Pagination> */}
    </>
  );
}

export default TwagensPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6) {
    twagens: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
