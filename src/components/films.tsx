import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

type FilmProps = {
    film: string;
    id: number;
};

const Film: FunctionComponent<FilmProps> = ({ film, id }): ReactElement => {
    const { data, status, error } = useQuery(`film-${id}`, () =>
        fetch(`${film}`)
    );

    if (status === 'loading') return <div>Loading....</div>;

    if (status === 'error') return <div>Error :(</div>;

    return <div>- {data.title}</div>;
};

export default Film;
