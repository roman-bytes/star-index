import React, { useState } from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { graphql, useStaticQuery, navigate, Link } from 'gatsby';
import CharacterList from './character';
import Autosuggest from 'react-autosuggest';
import slugify from '../utils/slugify';
import fuzzysort from 'fuzzysort';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const Search: FunctionComponent = (): ReactElement => {
    const gqlData = useStaticQuery(graphql`
        {
            allStarWarsPeople {
                nodes {
                    name
                }
            }
        }
    `);

    const results = gqlData.allStarWarsPeople.nodes;
    const [suggestions, setSuggestions] = useState(results);
    const [value, setValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [status, setStatus] = useState('idle');

    const getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }
        return fuzzysort.go(value, results, { key: 'name' });
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = (suggestions) => {
        return suggestions.target;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selected = getSuggestions(value);
        if (!value) {
            setStatus('error');
            return;
        }

        // If there is only one results lets just go to that page
        if (selected.length <= 1) {
            const slug = slugify(suggestions[0].target);
            navigate(`/${slug}`);
        } else {
            setShowResults(true);
        }
    };

    // Use your imagination to render suggestions.
    const renderSuggestion = (suggestions) => (
        <div className="bg-black text-white border border-t-0 px-4 py-2 focus:bg-starwarsYellow hover:bg-starwarsYellow hover:text-black hover:font-bold">
            {suggestions.target}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleOnChange = (event, { newValue, method }) => {
        setValue(newValue);
    };

    const clearResults = () => {
        setShowResults(false);
    };

    if (status === 'error')
        return (
            <div className="text-black border border-white bg-starwarsYellow p-4">
                <p>Error, the force is not strong with this one..... :(</p>
                <p>Please enter something into the input.</p>
                <button
                    className="bg-black text-white px-4 py-2"
                    onClick={() => setStatus('idle')}
                >
                    Try again
                </button>
            </div>
        );

    if (showResults)
        return (
            <>
                <div className="flex items-center justify-between text-white">
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" />
                    </svg>
                    <button onClick={() => clearResults()}>
                        Back to search
                    </button>
                </div>
                <CharacterList characterNames={getSuggestions(value)} />
            </>
        );

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full max-w-2xl relative text-gray-600 flex flex-row items-center justify-between"
        >
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
                className="absolute top-0 right-0 bg-starwarsYellow w-auto whitespace-pre px-4 py-2 text-black rounded-lg rounded-l-none"
            >
                Find Character
            </button>
        </form>
    );
};

export default Search;
