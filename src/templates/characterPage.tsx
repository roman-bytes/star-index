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
    console.log('character', character);
    const films = character.films.length
        ? character.films.map((film: string, ix) => <Film key={ix} film={film} id={ix} />)
        : 'N/A';

    const species = character.species.length
        ? character.species.map((speci: string, ix) => <Speci key={ix} speci={speci} id={ix} />)
        : 'N/A';

    const starships = character.starships.length
        ? character.starships.map((starship: string, ix) => <Starship key={ix} starship={starship} id={ix} />)
        : 'N/A';

    return (
        <Layout>
            <SEO title={character.name} />
            <div className="w-full text-white bg-profile-background bg-cover">
                <div className="bg-black bg-opacity-image-bg border border-white p-6">
                    <header className="flex flex-col sm:flex-row items-center justify-between border-b border-starwarsYellow mb-6">
                        <div className="flex items-center justify-between">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" />
                            </svg>
                            <Link to="/">Back to search</Link>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-200">
                            About
                        </h1>
                    </header>
                    <ul className="text-md">
                        <li>
                            <span className="font-bold">Name:</span>{' '}
                            {character.name ? character.name : 'N/A'}
                        </li>
                        <li>
                            <span className="font-bold">Height:</span>{' '}
                            {character.height ? character.height : 'N/A'}
                        </li>
                        <li>
                            <span className="font-bold">Weight:</span>{' '}
                            {character.mass ? character.mass : 'N/A'}
                        </li>
                        <li>
                            <span className="font-bold">Hair Color: </span>
                            {character.hair_color
                                ? character.hair_color
                                : 'N/A'}
                        </li>
                        <li>
                            <span className="font-bold">Birth Year: </span>
                            {character.birth_year
                                ? character.birth_year
                                : 'N/A'}
                        </li>
                    </ul>
                    <div className="flex flex-col md:flex-row justify-between mt-6 pt-6">
                        <div className="mt-6">
                            <h2 className="text-xl border-b border-white mb-2">
                                Species:{' '}
                            </h2>
                            <ul>{species}</ul>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl border-b border-white mb-2">
                                Films Appeared In:
                            </h2>
                            <ul>{films}</ul>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl border-b border-white mb-2">
                                Starships Flown
                            </h2>
                            <ul>{starships}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CharacterPage;
