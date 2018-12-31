import React, { Component } from "react";
import SearchForm from "./childComponents/SearchForm";
import ResultList from "./childComponents/ResultList";
import SavedList from "./childComponents/SavedList";
import API from "../utils/API";
import ReadPanel from "./childComponents/ReadPanel";
import ReadBtn from "./buttons/ReadBtn";
import SaveBtn from "./buttons/SaveBtn";

class Container extends Component {
  state = {
    results: [],
    saved: [],
    read: {
      read: false,
      body: {}
    }
  };

  componentDidMount() {
    this.getSaved();
    this.searchNYT("Florida Man");
  };

  searchNYT = query => {
    console.log("searchNYT: ", query);
    API.search(query)
    .then(res => {
      console.log("pre search state: ", this.state);
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
      // console.log("stateUpdate: ", stateUpdate);
      this.setState({ 
        results: stateUpdate
      });
      console.log("post search state: ", this.state);
    })
    .catch(err => console.log("answer error: ", err));
  };

  saveArticle = input => {
    console.log("saveArticles: ", input);
    for(let i=0; i< this.state.results.length; i++){
      if (this.state.results[i]._id === input){
        let thisOne = this.state.results[i];
        console.log("Save this one! ", thisOne);
        API.create(thisOne)
        .then(result => {
          console.log("saveArticle result: ", result.status);
          this.getSaved();
        })
        .catch(err => console.log("saveArticle result error: ", err))
      }
    }
  }

  getSaved = () => {
    console.log("get saved");
    API.getSaved()
    .then(result => {
      // console.log("get saved result: ", result.data);
      this.setState({
        saved: result.data
      })
      return result.data
    })
  }

  deleteArticle = input => {
    console.log("delete article: ", input);
    API.delete(input)
    .then((outcome) => {
      console.log("delete outcome: ", outcome);
      this.getSaved();
    })
    .catch(err => console.log("delete error: ", err));
  }

  readArticle = result => {
    console.log("read url: ", result);
    this.setState({ 
      read: {
        read: !this.state.read.read,
        body: result
      }
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
    if(this.state.read.read === true) {
      return (
        <div className="container"
          >
          <ReadBtn 
            name="Back"
            click={this.readArticle}
            url=""/>
          <SaveBtn 
              save={this.saveArticle}
              id={this.state.read.body._id} />
          <ReadPanel 
            url={this.state.read.body} />
        </div>
      )
    }else{
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
              <ResultList 
                read={this.readArticle} 
                save={this.saveArticle} 
                results={this.state.results} />
            </section>
            <section className="col col-4">
              <h2>Saved Articles</h2>
              <SavedList 
                read={this.readArticle}
                delete={this.deleteArticle}
                results={this.state.saved} />
            </section>
          </div>
        </div>
      );
    }
  }
}

export default Container;
