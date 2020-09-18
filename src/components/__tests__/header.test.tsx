import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Search from '../search';

describe('Search', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Search />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
