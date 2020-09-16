require('ts-node').register({ files: true });

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');

exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest,
}) => {
    let people;

    // Collect all of the data
    const result = await axios('https://swapi.dev/api/people')
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

    createNode({
        results: result,
        // required fields
        id: `star-wars-data`,
        parent: null,
        children: [],
        internal: {
            type: `starWars`,
            contentDigest: createContentDigest(result),
        },
    });
};
