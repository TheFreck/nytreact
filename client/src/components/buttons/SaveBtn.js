import React from "react";

const SaveBtn = props => {
  // console.log("saveBtn props: ", props.id);
  return (
    <button 
      onClick={()=> props.save(props.id)}
    >Save</button>
  );

}

export default SaveBtn;
