// import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default {
  siteMetadata: {
    title: `TwaGenes`,
    siteUrl: `https://www.twagenes.com`,
    description: `Feed your Genes in TwaGenes!`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '11z6ivky',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
