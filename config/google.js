module.exports = class Google {
  constructor() {
    this.fetch = require("node-fetch");
    this.authorizationString = `key=${process.env.GOOGLE_KEY}`;
    this.baseURL = "https://maps.googleapis.com/maps/api/geocode/";
    this.responseFormat = "json";
  }

  getCity(latlng) {
    return new Promise((resolve, reject) => {
      this.fetch(
        `${this.baseURL}${this.responseFormat}?latlng=${latlng}&${this.authorizationString}`
      )
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          reject(console.log(error));
        });
    });
  }
};
