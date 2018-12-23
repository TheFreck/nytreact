import React from 'react';
import { MyContext } from '../../App';

const NavBtn = () => {

  return (
    <MyContext.Consumer >
      {
        (context)=>{
          let newState;
          if(context.state.display === "home"){
            newState = "saved"
          }else{
            newState = "home"
          }
          let returnObject = {key: "display", value: newState};
          return(
            <div>
              <button onClick={()=>{
                console.log("returnObject: ", returnObject);
                context.stateChange(returnObject);
                }}>
                navigate
              </button>
            </div>
          )
        }
      }

    </MyContext.Consumer>
  );
}

export default NavBtn;


