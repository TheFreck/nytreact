import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "&api_key=99cdef63b2344ec4baa51164996381df";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: query => {
    // console.log(BASEURL + query + APIKEY);
    return axios.get(BASEURL + query + APIKEY);
  },
  create: query => {
    // console.log("create queried", query);
    return axios.post("/api/articles/", query);
  },
  getSaved: () => {
    return axios.get("/api/articles/");
  },
  delete: query => {
    console.log("deleting: ", query);
    return axios.delete("/api/articles/" + query);
  }
};
