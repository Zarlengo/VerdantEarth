module.exports = class NREL {
  constructor() {
    this.apiKey =
      process.env.NODE_ENV || "C3m3HqjHGN2Swrd8YSbB23jsTEirVKytinsFDnNu";
    this.authorizationString = `api_key=${this.apiKey}`;
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
    const URL = `${this.baseURL}${this.URL_object[URLtype]}${this.responseFormat}?${authorization}`;
    if (additionsObject === {}) {
      return URL;
    }
    const additionsKeys = Object.keys(additions_object);
    let queryString = "";
    additionsKeys.forEach(element => {
      queryString = queryString.concat(
        `&${element}=${additionsObject[element]}`
      );
    });
    return `${URL}${queryString}`;
  }

  getAPI(ReferenceFunction, URLtype, parameters) {
    fetch(this.URLConstruct(URLtype, parameters))
      .then(response => {
        return response.json();
      })
      .then(request => {
        ReferenceFunction(request.results);
      });
  }
};
