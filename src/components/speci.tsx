import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

type FilmProps = {
    speci: string;
    id: number;
};

const Film: FunctionComponent<FilmProps> = ({ speci, id }): ReactElement => {
    const { data, status, error } = useQuery(`speci-${id}`, () =>
        fetch(`${speci}`)
    );

    if (status === 'loading') return <div>Loading....</div>;

    if (status === 'error') return <div>Error :(</div>;

    return <div>- {data.name}</div>;
};

export default Film;
