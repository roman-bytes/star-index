import React from 'react';
import { FunctionComponent, ReactElement } from 'react';

const Character: FunctionComponent = ({ charcterInfo }): ReactElement => {
    const charcter = charcterInfo.map((charc, ix) => (
        <h1 key={ix} className="text-white text-xl">
            {charc.name}
        </h1>
    ));

    return <div className="flex bg-black">{charcter}</div>;
};

export default Character;
