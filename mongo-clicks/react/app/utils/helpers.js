const axios = require("axios");

// Both methods return promise object so .then() can be called
export default {
  getClicks: function() {
    return axios.get("/api");
  },
  saveClicks: function(clickData) {
    return axios.post("/api", clickData);
  }
};
