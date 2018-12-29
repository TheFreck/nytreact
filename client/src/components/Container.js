import React, { Component } from "react";
import SearchForm from "./childComponents/SearchForm";
import ResultList from "./childComponents/ResultList";
import SavedList from "./childComponents/SavedList";
import API from "../utils/API";

class Container extends Component {
  state = {
    search: "",
    results: [],
    saved: []
  };

  componentDidMount() {
    this.getSaved();
    console.log("mounted");
  };

  searchNYT = query => {
    console.log("searchNYT: ", query);
    API.search(query)
    .then(res => {
      console.log("pre search state: ", this.state.results);
      let stateUpdate = [];
      for(let i=0; i<10; i++){
        let updateObject = {};
        if(res.data.response.docs[i].snippet) updateObject.title = res.data.response.docs[i].snippet;
        if(res.data.response.docs[i].byline) updateObject.byline = res.data.response.docs[i].byline.original;
        if(res.data.response.docs[i].web_url) updateObject.url = res.data.response.docs[i].web_url;
        updateObject._id = res.data.response.docs[i]._id
        // console.log("updateObject: ", updateObject);
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
        let newState = this.state.saved.push(this.state.results[i]);
        this.setState({
          saved: newState
        })
        API.create(this.state.results[i])
        .then(result => {
          console.log("saveArticle result: ", result);
        })
        .catch(err => console.log("saveArticle result error: ", err))
      }
    }
  }

  getSaved = () => {
    console.log("get saved");
    API.getSaved()
    .then(result => {
      console.log("get saved result: ", result.data);
      this.setState({
        saved: result.data
      })
      return result.data
    })
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state.search);
  };

  render() {
    return (
      <div className="container">
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <div className="row">
          <section className="col col-8">
            <h2>Search Results</h2>
            <ResultList save={this.saveArticle} results={this.state.results} />
          </section>
          <section className="col col-4">
          <h2>Saved Articles</h2>
            <SavedList read={this.readArticle} results={this.state.saved} />
          </section>
        </div>
      </div>
    );
  }
}

export default Container;
