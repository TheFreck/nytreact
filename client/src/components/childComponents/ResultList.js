import React from "react";
import SaveBtn from "../buttons/SaveBtn";
import ReadBtn from "../buttons/ReadBtn";

const ResultList = props => {
  // console.log("result page props: ", props);
  return(
    <ul className="list-group">
      {props.results.map(result => {
        // console.log("result list result: ", result);
        return (
          <li 
            key={result._id}
            className="list-group-item"
          >
            <ReadBtn 
              name="Read"
              click={props.read}
              result={result} />
            <SaveBtn 
              save={props.save}
              id={result._id} />
            <h3>{result.title}</h3>
            <h5>{result.byline ? result.byline : "By NOBODY IN PARTICULAR"}</h5>
            <p>{result.url}</p>
          </li>
        )})
      }
    </ul>
  )
};

export default ResultList;
