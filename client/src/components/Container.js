import React, { Component } from "react";
// import { Router, Route } from 'react-router'
import SearchForm from "./childComponents/SearchForm";
import ResultList from "./childComponents/ResultList";
import API from "../utils/API";
// import Axios from "axios";

class Container extends Component {
  state = {
    search: "",
    results: []
  };

  componentDidMount() {
    // this.searchNYT("anteater");
    console.log("mounted");
  };

  searchNYT = query => {
    console.log("searchNYT: ", query);
    // API.create(query)
    // .then((response)=> console.log("container response: ", response))
    // .catch(err => console.log("container create error: ", err));
    API.search(query)
    .then(res => {
      console.log("res: ", res.data.response.docs);
      console.log("pre search state: ", this.state.results);
      let stateUpdate = [];
      for(let i=0; i<10; i++){
        let updateObject = {
          title: "",
          byline: "",
          url: "",
          _id: ""
        }
        if(res.data.response.docs[i].snippet){
          updateObject.title = res.data.response.docs[i].snippet;
        }
        if(res.data.response.docs[i].byline){
          updateObject.byline = res.data.response.docs[i].byline.original;
        }
        if(res.data.response.docs[i].web_url){
          updateObject.url = res.data.response.docs[i].web_url;
        }
        updateObject._id = res.data.response.docs[i]._id
        console.log("updateObject: ", updateObject);
        stateUpdate.push(updateObject);
      }
      console.log("stateUpdate: ", stateUpdate);
      this.setState({ 
        results: stateUpdate
      });
      console.log("post search state: ", this.state.results);
    })
    .catch(err => console.log("answer error: ", err));
  };

  saveArticle = (input) => {
    console.log("saveArticle: ", input);
    for(let i=0; i< this.state.results.length; i++){
      if (this.state.results[i]._id === input){
        console.log("this one! ", this.state.results[i]);
        API.create(this.state.results[i])
        .then(result => {
          console.log("saveArticle result: ", result);
        })
        .catch(err => console.log("saveArticle result error: ", err))
      }
    }
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state.search);
  };

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList cb={this.saveArticle} results={this.state.results} />
      </div>
    );
  }
}

export default Container;
