import React from 'react';

const HomeBtn = props => {

  function goHome() {
    console.log("props: ", props.cb);
    props.cb({
      key: "display",
      value: "home"
    });
  }
  
  return (
    <button onClick={goHome}>
      go home
    </button>
  );
}

export default HomeBtn;


