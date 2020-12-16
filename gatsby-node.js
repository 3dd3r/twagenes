import path from 'path';
import fetch from 'isomorphic-fetch';
// import Tagine from './src/templates/Tagine';

async function turnTaginesIntoPages({ graphql, actions }) {
  const tagineTemplate = path.resolve('./src/templates/Tagine.js');

  const { data } = await graphql(`
    query {
      tagines: allSanityTagine {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.tagines.nodes.forEach((tagine) => {
    actions.createPage({
      path: `tagine/${tagine.slug.current}`,
      component: tagineTemplate,
      context: {
        slug: tagine.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/tagines.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchCoffeeIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch the list of Wines
  const response = await fetch('https://sampleapis.com/wines/api/whites');
  const wines = await response.json();

  for (const wine of wines) {
    const nodeMeta = {
      id: createNodeId(`wine-${wine.wine}`),
      parent: null,
      children: [],
      internal: {
        type: 'Wine',
        mediaType: 'application/json',
        contentDigest: createContentDigest(wine),
      },
    };
    actions.createNode({
      ...wine,
      ...nodeMeta,
    });
  }
}

async function turnTwagensIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      twagens: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.twagens.nodes.forEach((person) => {
    actions.createPage({
      component: path.resolve('./src/templates/Person.js'),
      path: `/twagens/${person.slug.current}`,
      context: {
        name: person.person,
        slug: person.slug.current,
      },
    });
  });

  const GATSBY_PAGE_SIZE = 4;
  // const pageSize = process.env.GATSBY_PAGE_SIZE;
  const pageSize = GATSBY_PAGE_SIZE;
  const pageCount = Math.ceil(data.twagens.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/twagens/${i + 1}`,
      component: path.resolve('./src/pages/twagens.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of recipes and source them into our gatspy API
  await Promise.all([fetchCoffeeIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnTaginesIntoPages(params),
    turnToppingsIntoPages(params),
    turnTwagensIntoPages(params),
    // turnWinesIntoPages(params),
  ]);
}
