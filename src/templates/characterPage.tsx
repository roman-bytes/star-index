import React from 'react';
import { FunctionComponent, ReactElement } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import Film from '../components/films';
import Speci from '../components/speci';
import Starship from '../components/starship';

type CharacterPageProps = {
    pageContext: {
        node: {
            films: [];
            species: [];
            starships: [];
            name: string;
            height: string;
            mass: string;
            hair_color: string;
            birth_year: string;
        };
    };
};

const CharacterPage: FunctionComponent<CharacterPageProps> = ({
    pageContext,
}): ReactElement => {
    const character = pageContext.node;

    const films = character.films.map((film, ix) => (
        <Film key={ix} film={film} id={ix} />
    ));

    const species = character.species.map((speci, ix) => (
        <Speci key={ix} speci={speci} id={ix} />
    ));

    const starships = character.starships.map((starship, ix) => (
        <Starship key={ix} starship={starship} id={ix} />
    ));

    return (
        <Layout>
            <SEO title={character.name} />
            <div className="w-full bg-black text-white border border-white p-6">
                <Link to="/">Back to search</Link>
                <h1>About</h1>
                <div>Name: {character.name}</div>
                <div>Height: {character.height}</div>
                <div>Weight: {character.mass}</div>
                <div>Hair Color: {character.hair_color}</div>
                <div>Birth Year: {character.birth_year}</div>
                <h2>Species: </h2>
                {species}
                <h2>Films Appeared In:</h2>
                {films}
                <h2>Starships Flown</h2>
                {starships}
            </div>
        </Layout>
    );
};

export default CharacterPage;
