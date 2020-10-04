module.exports = ReferenceFunction => {
  const geoIPLookupURL = "https://json.geoiplookup.io/";

  fetch(geoIPLookupURL)
    .then(response => {
      return response.json();
    })
    .then(request => {
      ReferenceFunction(request);
    });
};
