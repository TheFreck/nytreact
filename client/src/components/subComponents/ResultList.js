import React from "react";

const ResultList = props => (
  <ul className="list-group">
    {props.results.map(result => (
      <li className="" key={result.id}>
        <img
          alt={result.title}
          className=""
          src={result.images.original.url}
        />
      </li>
    ))}
  </ul>
);

export default ResultList;
