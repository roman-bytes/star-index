import React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { Link } from 'gatsby';
import slugify from '../utils/slugify';

const Character: FunctionComponent = ({ characterInfo }): ReactElement => {
    console.log('charc', characterInfo);
    const character = characterInfo.map((charc, ix) => (
        <Link
            key={ix}
            to={slugify(charc.name)}
            className="text-white border border-white p-4 hover:border-starwarsYellow flex items-center justify-between"
        >
            {charc.name}
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6.16504 20.13L7.93504 21.9L17.835 12L7.93504 2.10001L6.16504 3.87001L14.295 12L6.16504 20.13H6.16504Z" />
            </svg>
        </Link>
    ));

    return (
        <div className="bg-black p-8 w-full grid grid-cols-3 grid-rows-3 gap-4">
            {character}
        </div>
    );
};

export default Character;
