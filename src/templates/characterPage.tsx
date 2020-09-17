import React from 'react';
import { FunctionComponent, ReactElement } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';

const CharacterPage: FunctionComponent = ({ pageContext }): ReactElement => {
    const character = pageContext.node;
    return (
        <Layout>
            <SEO title={character.name} />
            <div className="bg-black text-white">
                <Link to="/">Back to search</Link>
                <h1>About</h1>
                <div>{character.name}</div>
                <div>{character.height}</div>
                <div>{character.hair_color}</div>
            </div>
        </Layout>
    );
};

export default CharacterPage;
