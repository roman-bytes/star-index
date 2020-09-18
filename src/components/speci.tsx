import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

type FilmProps = {
    speci: string;
    id: number;
};

const Film: FunctionComponent<FilmProps> = ({ speci, id }): ReactElement => {
    //Change url from http to https
    const secureSpeci = speci.replace('http', 'https');

    const { data, status, error } = useQuery(`speci-${id}`, () =>
        fetch(`${secureSpeci}`)
    );

    if (status === 'loading')
        return (
            <div className="h-4 bg-gray-800 rounded animate-pulse my-2"></div>
        );

    if (status === 'error') return <div>Error :( {error}</div>;

    return <li>{data.name}</li>;
};

export default Film;
