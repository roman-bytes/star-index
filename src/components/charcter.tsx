import React from 'react';
import { FunctionComponent, ReactElement } from 'react';

const Character: FunctionComponent = ({ charcterInfo }): ReactElement => (
    <div>
        <h1 className="text-white text-xl">{charcterInfo.name}</h1>
    </div>
);

export default Character;
