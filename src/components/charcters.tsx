import React from 'react';
import { FunctionComponent } from 'react';
import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

const Characters: FunctionComponent = (): ReactElement => {
    const { status, error, data } = useQuery('charcters', () =>
        fetch('https://swapi.dev/api/people')
    );

    if (status === 'loading') return <p>Loading....</p>;
    if (status === 'error') return <p>Error..... :(</p>;

    return (
        <div>
            <h1>Charcters</h1>
            {data.results.map((person) => {
                const personUrlParts = person.url.split('/').filter(Boolean);
                const personId = personUrlParts[personUrlParts.length - 1];
                return (
                    <article key={personId} style={{ margin: '16px 0 0' }}>
                        {person.name}
                    </article>
                );
            })}
        </div>
    );
};

export default Characters;
