const axios = require("axios");

// Geocoder API key
import apiKey from './apiKey';

export default {

  runQuery: function(location) {
    console.log(location);

    let queryURL = `http://api.opencagedata.com/geocode/v1/json?query=${location}&pretty=1&key=${apiKey}`;

    return axios.get(queryURL).then(function(response) {
      console.log(response);
      return response.data.results[0].formatted;
    });
  },

  getHistory: function () {
    return axios.get("/api");
  },

  saveResult: function (result) {
    console.log('run saveResult');
    return axios.post("/api", result);
  }

};