import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&api_key=99cdef63b2344ec4baa51164996381df";

export default {
  search: (query) => {
    // console.log("query: ", query);
    return axios.get(BASEURL + query + APIKEY);
  },
  results: (results) => {
    console.log("API results: ", results);
    return axios.post("/search", results)
  }
};
