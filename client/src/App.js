import React, { Component } from 'react';
import Home from "./pages/home/Home";
import Saved from "./pages/saved/Saved";
import NavBtn from "./components/navigation/navBtn";
import API from "./utils/API";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

export const MyContext = React.createContext()

export class App extends Component {
  state = {
    display: "home",
    stateChange: (keyval) => {
      console.log("State change");
      this.setState({
        [keyval.key]: keyval.value
      })
    }
  }
  
  searchAPI = query => {
    console.log("API search");
    API.search(query)
      .then(res => {
        console.log(res.data.data);
        this.setState({ results: res.data.data })
      })
      .catch(err => console.log(err));
  }
  

  render() {
    return(
      <Router>
        <MyContext.Provider className="container" value={{
          state: this.state
        }}>
          <NavBtn ></NavBtn>
          <Route exact path="/saved" component={Saved}></Route>
          <Route path="/" component={Home}></Route>
        </MyContext.Provider>
      </Router>
    );
  }
}

