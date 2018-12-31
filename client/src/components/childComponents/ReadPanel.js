import React from "react";
import Iframe from "react-iframe";

const ReadPanel = props => {
  console.log("read panel props: ", props);
  return (
    <form>
      <div className="form-group">
        <Iframe 
          url={props.url.url}
          width="900px"
          height="750px"/>
      </div>
    </form>
  );

}

export default ReadPanel;
