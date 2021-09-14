import React, { createElement } from 'react';

export function SearchItem({ hit, components }) {
  return (
    <a href={`/blog/${hit.fields.slug}`} className="block bg-white text-black p-2">
      <div className="">
        <div className="">
          <components.Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}