// Initial location determination based on the IP address location of the user
const geoIPLookupURL = "https://json.geoiplookup.io/";

fetch(geoIPLookupURL)
  .then(response => response.json())
  .then(result => {
    const locationString = `${result.city}, ${result.region} ${result.country_code}`;
    document.querySelector("#location").textContent = locationString;
    getUsage(result.region);
    getSolar(locationString, "name_string");
  });

// Adds a listener to the search button or enter key press
document
  .querySelector(".search-icon")
  .addEventListener("click", userInput, false);
document.querySelector("#searchText").addEventListener(
  "keyup",
  event => {
    if (event.keyCode === 13) {
      userInput();
    }
  },
  false
);

// Function to handle the input request
function userInput() {
  // Gets the value of the user input
  const userText = document.querySelector("#searchText").value;
  document.querySelector("#searchText").value = "";

  // Checks if the input matches a lat long format
  let userArray = [];
  if (userText.split(",").length > 1) {
    userArray = userText.split(",");
  } else if (userText.split(" ").length > 1) {
    userArray = userText.split(" ");
  }

  if (userArray.length === 2) {
    let expCheck = true;
    for (let index = 0; index < userArray.length; index++) {
      userArray[index] = userArray[index].trim();
      if (isNaN(userArray[index])) {
        expCheck = false;
      } else {
        userArray[index] = parseFloat(userArray[index]);
      }
    }
    if (expCheck) {
      getSolar(userArray, "lat_long");
      return;
    }
  }

  // All other inputs assumed city string
  getSolar(userText, "name_string");
}

// Adds a listener to the GPS button to allow loading based on GPS coordinates
document.querySelector(".location-icon").addEventListener(
  "click",
  () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadLatLong);
    }
  },
  false
);

// Function to get the latitude and longitude from the browser
function loadLatLong(result) {
  getSolar([result.coords.latitude, result.coords.longitude], "lat_long");
}

// Function to get the solar irradiance after a location has been choosen
function getSolar(location, locationType) {
  // If latitude & longitude are provided, send to the google API to get the city name
  switch (locationType) {
    case "lat_long":
      parameters = {
        lat: location[0],
        lon: location[1]
      };
      // Google API to convert lat/lon to city, region, country
      fetch(`/api/google/${JSON.stringify(parameters)}`)
        .then(response => response.json())
        .then(result => {
          document.querySelector(
            "#location"
          ).textContent = `${result[2].short_name}, ${result[4].short_name} ${result[5].short_name}`;
          getUsage(result[4].short_name);
        });
      break;
    case "name_string":
    default:
      document.querySelector("#location").textContent = location;
      parameters = {
        address: location
      };
      break;
  }
  // Calls the api to get the irradiance value for the location
  fetch(`/api/solar/${JSON.stringify(parameters)}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      // Displays hte irradiance and calculates out the necessary solar panel size for the residence
      document.querySelector("#irradiance-result").textContent = result;
      panelSize =
        parseFloat(document.querySelector("#power").value * 12) /
        (result * 365);
      document.querySelector(
        "#solarPanel"
      ).textContent = `${panelSize}`.substring(0, 5);
    });
}

// Adds a listener to the Irradiance button
document.querySelector(".location-icon").addEventListener(
  "click",
  () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadLatLong);
    }
  },
  false
);

document.querySelector("#calculate").addEventListener(
  "click",
  () => {
    getSolar(document.querySelector("#location").textContent, "name_string");
  },
  false
);

// Function which returns the average household power usage by USA state
function getUsage(stateCode) {
  const stateList = {
    AL: 1211,
    AK: 632,
    AZ: 1049,
    AR: 1133,
    CA: 557,
    CO: 723,
    CT: 752,
    DE: 944,
    DC: 720,
    FL: 1078,
    GA: 1088,
    HI: 515,
    ID: 1055,
    IL: 755,
    IN: 1005,
    IA: 908,
    KS: 926,
    KY: 1154,
    LA: 1273,
    ME: 551,
    MD: 1031,
    MA: 638,
    MI: 665,
    MN: 817,
    MS: 1220,
    MO: 1086,
    MT: 860,
    NE: 1034,
    NV: 924,
    NH: 629,
    NJ: 687,
    NM: 655,
    NY: 602,
    NC: 1098,
    ND: 1205,
    OH: 892,
    OK: 1142,
    OR: 976,
    PA: 857,
    RI: 602,
    SC: 1124,
    SD: 1055,
    TN: 1245,
    TX: 1174,
    UT: 798,
    VY: 569,
    VA: 1156,
    WA: 1041,
    WV: 1118,
    WI: 703,
    WY: 894
  };

  // Places the average power usage into the HTML
  if (stateCode in stateList) {
    document.querySelector("#power").value = stateList[stateCode];
    return;
  }
  // Default household power usage in the USA
  document.querySelector("#power").value = 909;
}
