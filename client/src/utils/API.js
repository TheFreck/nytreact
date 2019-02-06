import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const APIKEY = "w80nJEXGsEkjzRaqSiEabPoOzEATlotD"

// move the API call to the controller to protect the API_KEY in a process.env

export default {
  search: (query) => {
    console.log(`${BASEURL}${query}&api-key=${APIKEY}`);
    return axios.get(`${BASEURL}${query}&api-key=${APIKEY}`);
  },
  create: (query) => {
    console.log("create queried", query);
    return axios.post("/api/articles/", query);
  },
  getSaved: () => {
    return axios.get("/api/articles/");
  },
  delete: (query) => {
    console.log("deleting: ", query);
    return axios.delete("/api/articles/" + query);
  }
};
