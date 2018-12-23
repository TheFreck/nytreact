import React from 'react';

const SavedBtn = props => {

  function goSaved() {
    console.log("props: ", props.cb);
    props.cb({
      key: "display",
      value: "saved"
    });
  }

  return (
    <button onClick={goSaved}>
      go to saved
    </button>
  );
}

export default SavedBtn;


