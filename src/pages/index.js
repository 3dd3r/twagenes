import React from 'react';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import { HomePageStyle } from '../styles/Home';
import SEO from '../components/SEO';

export default function HomePage({ data }) {
  const taginePic = data.taginePic.nodes;
  return (
    <HomePageStyle>
      <SEO title="Home" />
      <h1>
        Feed your Genes in <span>Twa</span>Genes
      </h1>
      <h2>
        Want a delicious <span>tagine</span>, but no time? we'll deliver it hot
        and yummy.
      </h2>
      <h3>Opening Hours</h3>
      <p>
        7.30AM - 10.30PM <br />
        Monday - Sunday
      </p>
      <Link to="/tagines">
        <section className="tagines">
          <div>
            <h3>Beef tagines</h3>
            <img width="" src={taginePic[2].image.asset.fluid.src} alt="" />
          </div>
          <div>
            <h3>Chicken tagines</h3>
            <img width="" src={taginePic[3].image.asset.fluid.src} alt="" />
          </div>
          <div>
            <h3>Vegan tagines</h3>
            <img width="" src={taginePic[5].image.asset.fluid.src} alt="" />
          </div>
        </section>
      </Link>
    </HomePageStyle>
  );
}

export const query = graphql`
  query {
    taginePic: allSanityTagine {
      nodes {
        image {
          asset {
            fluid {
              # ...GatsbySanityImageFluid
              src
            }
          }
        }
      }
    }
  }
`;
