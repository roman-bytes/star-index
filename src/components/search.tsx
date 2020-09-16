import React, { useState } from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useQuery } from 'react-query';
import Character from '../components/charcter';
import fetch from '../utils/fetch';
import Autosuggest from 'react-autosuggest';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const Search: FunctionComponent = (): ReactElement => {
    const gqlData = useStaticQuery(graphql`
        {
            starWars {
                results {
                    name
                }
            }
        }
    `);
    const results = gqlData.starWars.results;
    const [suggestions, setSuggestions] = useState(results);
    const [fetching, setFetching] = useState(false);
    const [value, setValue] = useState('');

    const { status, error, data, refetch, isSuccess } = useQuery(
        'charcters',
        () => fetch(`https://swapi.dev/api/people/?search=${value}`),
        {
            enabled: fetching,
        }
    );

    console.log('data', data);

    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return results.filter((suggestion) => regex.test(suggestion.name));
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = (suggestions) => {
        setFetching(true);

        return suggestions.name;
    };

    // Use your imagination to render suggestions.
    const renderSuggestion = (suggestions) => (
        <div className="bg-black text-white border border-t-0 px-4 py-2 hover:bg-starwarsYellow hover:text-black hover:font-bold">
            {suggestions.name}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
            setFetching(false);
        }
        console.log('onSuggestionsFetchRequested-value', value);
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleOnChange = (event, { newValue, method }) => {
        setValue(newValue);
    };

    if (status === 'loading') return <p className="text-white">Loading....</p>;
    if (status === 'error') return <p className="text-red">Error..... :(</p>;

    if (status === 'success')
        return <Character charcterInfo={data.results[0]} />;

    return (
        <div className="w-full relative text-gray-600 flex flex-row items-center justify-between">
            <Autosuggest
                className="w-full"
                suggestions={suggestions}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    className:
                        'w-full border-2 border-gray-300 bg-black h-10 px-5 rounded-lg text-md text-gray-200 focus:outline-none pr-lg',
                    placeholder: 'Find a charcter',
                    value,
                    onChange: handleOnChange,
                }}
            />
            <button
                type="submit"
                onClick={getSuggestionValue}
                className="absolute top-0 right-0 bg-starwarsYellow w-auto whitespace-pre px-4 py-2 text-black rounded-lg rounded-l-none"
            >
                Find Character
            </button>
        </div>
    );
};

export default Search;
