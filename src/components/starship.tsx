import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

type StarshipProps = {
    starship: string;
    id: number;
};

const Starship: FunctionComponent<StarshipProps> = ({
    starship,
    id,
}): ReactElement => {
    const secureStarship = starship.replace('http', 'https');

    const { data, status, error } = useQuery(`starship-${id}`, () =>
        fetch(`${secureStarship}`)
    );

    if (status === 'loading') return <div className="h-4 bg-gray-800 rounded animate-pulse my-2"></div>;

    if (status === 'error') return <div>Error :( {error}</div>;

    return <li>{data.name}</li>;
};

export default Starship;
