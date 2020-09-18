require('ts-node').register({ files: true });

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');
const path = require('path');

function slugify(string) {
    const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest,
    createNodeId,
}) => {
    let people, films, speci, starships;

    // Collect all of the data
    const peopleResults = await axios('https://swapi.dev/api/people')
        .then((res) => {
            people = res.data.results;
            return res.data.count;
        })
        .then((count) => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            const promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
            }

            return Promise.all(promises);
        })
        .then((res) => {
            people = res.reduce(
                (acc, data) => [...acc, ...data.data.results],
                people
            );
            return people;
        })
        .catch((error) => console.log('error', error));

    peopleResults.map((result) =>
        createNode({
            ...result,
            // required fields
            id: createNodeId(result.name),
            internal: {
                type: `starWarsPeople`,
                contentDigest: createContentDigest(result),
            },
        })
    );

    const filmResults = await axios('http://swapi.dev/api/films/')
        .then((res) => {
            films = res.data.results;
            return res.data.count;
        })
        .then((count) => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            const promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(axios(`https://swapi.dev/api/films?page=${i}`));
            }

            return Promise.all(promises);
        })
        .then((res) => {
            films = res.reduce(
                (acc, data) => [...acc, ...data.data.results],
                films
            );
            return films;
        })
        .catch((error) => console.log('error', error));

    filmResults.map((result) =>
        createNode({
            ...result,
            // required fields
            id: createNodeId(result.title),
            internal: {
                type: `starWarsFilms`,
                contentDigest: createContentDigest(result),
            },
        })
    );

    const speciResults = await axios('http://swapi.dev/api/species/')
        .then((res) => {
            speci = res.data.results;
            return res.data.count;
        })
        .then((count) => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            const promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(axios(`https://swapi.dev/api/species?page=${i}`));
            }

            return Promise.all(promises);
        })
        .then((res) => {
            speci = res.reduce(
                (acc, data) => [...acc, ...data.data.results],
                speci
            );
            return speci;
        })
        .catch((error) => console.log('error', error));

    speciResults.map((result, ix) =>
        createNode({
            ...result,
            // required fields
            id: createNodeId(`${result.name}-${ix}`),
            internal: {
                type: `starWarsSpeci`,
                contentDigest: createContentDigest(result),
            },
        })
    );

    const starshipResults = await axios('http://swapi.dev/api/starships')
        .then((res) => {
            starships = res.data.results;
            return res.data.count;
        })
        .then((count) => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            const promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(
                    axios(`https://swapi.dev/api/starships?page=${i}`)
                );
            }

            return Promise.all(promises);
        })
        .then((res) => {
            starships = res.reduce(
                (acc, data) => [...acc, ...data.data.results],
                starships
            );
            return starships;
        })
        .catch((error) => console.log('error', error));

    starshipResults.map((result, ix) =>
        createNode({
            ...result,
            // required fields
            id: createNodeId(`${result.name}`),
            internal: {
                type: `starWarsStarship`,
                contentDigest: createContentDigest(result),
            },
        })
    );

};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    // Query for markdown nodes to use in creating pages.
    const result = await graphql(
        `
            {
                allStarWarsPeople {
                    edges {
                        node {
                            birth_year
                            eye_color
                            films
                            gender
                            hair_color
                            height
                            homeworld
                            id
                            mass
                            name
                            skin_color
                            species
                            starships
                            url
                            vehicles
                        }
                    }
                }
            }
        `
    );
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }
    // Create pages for each markdown file.
    const charcterTemplate = path.resolve(`src/templates/characterPage.tsx`);
    result.data.allStarWarsPeople.edges.forEach(({ node }) => {
        const path = slugify(node.name);
        createPage({
            path,
            component: charcterTemplate,
            // In your blog post template's graphql query, you can use pagePath
            // as a GraphQL variable to query for data from the markdown file.
            context: {
                node,
            },
        });
    });
};
