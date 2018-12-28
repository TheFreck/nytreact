import React from "react";

const ResultList = props => {
  console.log("props: ", props);
  return(
    <ul className="list-group">
      {props.results.map(result => {
        console.log("result: ", result);
        const callback = () => {
          props.cb(result._id)
        }
        return (
          <li onClick={callback}
            key={result._id}
            className="list-group-item"
          >
            <h3>{result.title}</h3>
            <h5>By: {result.byline ? result.byline : "nobody"}</h5>
            <p>{result.url}</p>
          </li>
        )})
      }
    </ul>
  )
};

export default ResultList;
