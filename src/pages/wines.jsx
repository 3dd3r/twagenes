import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const WineGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleWineStyles = styled.div`
  border: 1px solid var(--red);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    object-fit: cover;
    display: block;
    /* height: 600px; */
  }
`;

function WinesPage({ data, pageContext }) {
  const wines = data.wines.nodes;
  return (
    <>
      <WineGridStyles>
        {wines.map((wine) => {
          const rating = Math.round(wine.rating.average);
          return (
            <SingleWineStyles key={wine.id}>
              <h3>{wine.wine}</h3>
              <p>{wine.winery}</p>
              <img src={wine.image} alt={wine.wine} />
              <p>{`⭐`.repeat(rating)}</p>
              <p>{wine.rating.reviews}</p>
            </SingleWineStyles>
          );
        })}
      </WineGridStyles>
    </>
  );
}

export default WinesPage;

export const query = graphql`
  query($skip: Int = 0, $winePageSize: Int = 6) {
    wines: allWine(limit: $winePageSize, skip: $skip) {
      totalCount
      nodes {
        id
        winery
        wine
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
