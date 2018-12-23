import React, { Component } from 'react';
// import axios from "axios";
import API from "../../utils/API";
import SearchForm from '../../components/subComponents/SearchForm';
import './Home.css';

export const MyContext = React.createContext()

class Home extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: ""
  };

  // componentDidMount() {
  //   this.searchNYT(this.state);
  // };

  searchNYT = query => {
    console.log("searchNYT: ", query);
    API.search(query.topic)
    .then(res => {
      console.log("api search: ", res.data.response);
      API.results(res.data.response)
      .then(function(response){
        console.log("response: ", response);
      })
      .catch(function(err){
        console.log("error: ", err);
      })
    })
    .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state);
  };

  render() {

    
    return (
      <MyContext.Provider value={{ 
        state: this.state,
        search: this.searchNYT,
        change: this.handleInputChange,
        submit: this.handleFormSubmit
        }} >
        <SearchForm />
      </MyContext.Provider>
    );
  };
};

export default Home;


