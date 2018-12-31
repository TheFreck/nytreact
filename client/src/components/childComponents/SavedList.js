import React from "react";
import ReadBtn from "../buttons/ReadBtn";
import DeleteBtn from "../buttons/DeleteBtn";

const SavedList = props => {
  let results = props.results;
  return(
    <ul className="list-group">
      {/* {console.log("saved list props: ", results)} */}
      {results.map(result => {
        // console.log("saved list result: ", result);
        return (
          <li 
            key={result._id}
            className="list-group-item"
          >
            <ReadBtn 
              name="Read"
              click={props.read}
              url={result.url}/>
            <DeleteBtn 
              id={result._id} 
              delete={props.delete} />
            <h3>{result.title}</h3>
            <h5>{result.byline ? result.byline : "nobody"}</h5>
            <p>{result.url}</p>
          </li>
        )})
      }
    </ul>
  )
};

export default SavedList;
