import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const TagineGridStyles = styled.div`
  display: grid;
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const TagineStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SingleTagine({ tagine }) {
  return (
    <TagineStyles>
      <Link to={`/tagine/${tagine.slug.current}`}>
        <h2>
          <span className="mark">{tagine.name}</span>
        </h2>
      </Link>
      <p>{tagine.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={tagine.image.asset.fluid} alt={tagine.name} />
      <h3>{tagine.price}</h3>
    </TagineStyles>
  );
}

function TagineList({ tagines }) {
  return (
    <TagineGridStyles>
      {tagines.map((tagine) => (
        <SingleTagine key={tagine.id} tagine={tagine} />
      ))}
    </TagineGridStyles>
  );
}

export default TagineList;
