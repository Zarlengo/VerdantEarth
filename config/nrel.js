module.exports = class NREL {
  constructor() {
    this.fetch = require("node-fetch");
    this.authorizationString = `api_key=${process.env.NREL_API}`;
    this.baseURL = "https://developer.nrel.gov";
    this.URLobject = {
      solarQuery: "/api/solar/data_query/v1",
      solarResource: "/api/solar/solar_resource/v1",
      pvWatts: "/api/pvwatts/v6",
      pvdaqSiteData: "/api/pvdaq/v3/site_data",
      pvdaqDataFile: "/api/pvdaq/v3/data_file",
      pvdaySites: "/api/pvdaq/v3/sites",
      utilityRates: "/api/utility_rates/v3",
      utilityCensus: "/api/census_rate/v3",
      NSRDBdataQuery: "/api/solar/nsrdb_data_query",
      physicalSolarModel: "/api/nsrdb/v2/solar/psm3-download",
      physicalSolarModel5min: "/api/nsrdb/v2/solar/psm3-5min-download",
      physicalSolarModelTMY: "/api/nsrdb/v2/solar/psm3-tmy-download",
      siteCount: "/api/nsrdb/v2/site-count",
      spectralData: "/api/nsrdb_api/solar/spectral_ondemand_download"
    };
    this.responseFormat = ".json";
  }

  URLConstruct(URLtype, additionsObject) {
    additionsObject = JSON.parse(additionsObject);
    const URL = `${this.baseURL}${this.URLobject[URLtype]}${this.responseFormat}?${this.authorizationString}`;
    if (additionsObject === {}) {
      return URL;
    }
    const additionsKeys = Object.keys(additionsObject);
    let queryString = "";
    additionsKeys.forEach(element => {
      queryString = queryString.concat(
        `&${element}=${additionsObject[element]}`
      );
    });
    return `${URL}${queryString}`;
  }

  getAPI(URLtype, parameters) {
    return new Promise((resolve, reject) => {
      this.fetch(this.URLConstruct(URLtype, parameters))
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          reject(console.log(error));
        });
    });
  }
};
