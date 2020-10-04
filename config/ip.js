module.exports = () => {
  const geoIPLookupURL = "https://json.geoiplookup.io/";

  fetch(geoIPLookupURL).then(response => {
    return response.json();
  });
};
