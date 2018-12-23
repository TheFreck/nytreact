import React from "react";
import { MyContext } from "../../pages/home/Home";


const SearchForm = () => {
  return(
    <MyContext.Consumer >
      {
        (context)=>{
          console.log("context.searchNYT: ", context.search);


          return(
            <div className="">
              <label htmlFor="topic">Topic:</label>
              <input
                onChange={context.change}
                value={context.state.topic}
                name="topic"
                type="text"
                className=""
                placeholder="Search by topic"
                id="topic"
              />
              <label htmlFor="startYear">Start Year:</label>
              <input
                onChange={context.change}
                value={context.state.startYear}
                name="startYear"
                type="text"
                className=""
                placeholder="Begin date"
                id="startYear"
              />
              <label htmlFor="endYear">End Year:</label>
              <input
                onChange={context.change}
                value={context.state.endYear}
                name="endYear"
                type="text"
                className=""
                placeholder="End date"
                id="endYear"
              />
              <button
                onClick={context.submit}
                className="btn"
              >
                Search
              </button>
            </div>
          )
        }
      }
    </MyContext.Consumer>
  );
}

export default SearchForm;
