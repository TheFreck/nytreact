import React, { Component } from "react";
import ResultList from "../../components/subComponents/ResultList";

class SearchResultContainer extends Component {
  state = {
    results: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens


  render() {
    return (
      <div>
        <ResultList results={this.state.results} />
      </div>
    );
  }
}

export default SearchResultContainer;
