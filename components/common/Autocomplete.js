import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Link from "next/link";
import { renderHTML } from '@agility/nextjs'
import { SearchIcon, ChevronRightIcon } from '@heroicons/react/solid'


const searchClient = algoliasearch('NAAQKH78HP', '11ededb0eaf3bcbd79331486e381b798');


export function Autocomplete() {
	// (1) Create a React state.
	const inputRef = React.useRef(null)
	const [autocompleteState, setAutocompleteState] = React.useState({});
	const autocomplete = React.useMemo(
	  () =>
		createAutocomplete({
			placeholder: "Search Articles",
		  onStateChange({ state }) {
			// (2) Synchronize the Autocomplete state with the React state.
			setAutocompleteState(state);
		  },
		  getSources() {
			return [
			  // (3) Use an Algolia index source.
			  {
				sourceId: 'articles',
				getItemInputValue({ item }) {
				  return item.query;
				},
				getItems({ query }) {
				  return getAlgoliaResults({
					searchClient,
					queries: [
					  {
						indexName: 'agility-forms-acount',
						query,
						params: {
						  hitsPerPage: 4,
						  highlightPreTag: '<mark>',
						  highlightPostTag: '</mark>',
						},
					  },
					],
				  });
				},
				getItemUrl({ item }) {
				  return item.url;
				},
			  },
			];
		  },
		}),
	  []
	);

	return (
	  <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
		<form
		  className="aa-Form"
		  {...autocomplete.getFormProps({ inputElement: inputRef.current })}
		>
		  <input
		  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		   {...autocomplete.getInputProps({})} />
		</form>

		<div className="relative " {...autocomplete.getPanelProps({})} style={{zIndex:20}}>
		  {autocompleteState.isOpen &&
			autocompleteState.collections.map((collection, index) => {
			  const { source, items } = collection;
			  return (
				<div key={`source-${index}`} className="aa-Source absolute bg-white z-20 border border-gray-300 w-full">
				  {items.length > 0 && (
					<ul className="aa-List" {...autocomplete.getListProps()}>
					  {items.map((item) => (
						<li
						  key={item.objectID}
						  className="aa-Item"
						  {...autocomplete.getItemProps({
							item,
							source,
						  })}
						>
						   <Link href={`/blog/${item.fields.slug}`}>
							<a className="SearchResult px-5 py-2 block w-full hover:bg-gray-50">
								<span className="SearchResult__titlee block text-indigo-600 text-sm font-bold" dangerouslySetInnerHTML={renderHTML(item._highlightResult.fields.title.value)}></span>

								{item._snippetResult.fields.content &&
								  <span className="SearchResult__description block text-sm mb-2" dangerouslySetInnerHTML={renderHTML(item._snippetResult.fields.content.value)}></span>
								}
								<span className="SearchResult__category-section block text-xs font-light text-gray-600">
								  {item.fields.category.fields.title} <ChevronRightIcon className="inline w-2"/>
								</span>
							</a>
						  </Link>

						</li>
					  ))}
					</ul>
				  )}
				</div>
			  );
			})}
		</div>
	  </div>
	);

	// ...
  }