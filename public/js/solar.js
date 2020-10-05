const geoIPLookupURL = "https://json.geoiplookup.io/";

fetch(geoIPLookupURL)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    const locationString = `${result.city}, ${result.region} ${result.country_code}`;
    document.querySelector("#location").textContent = locationString;
  });

// Adds a listener to the search button to allow loading based on GPS coordinates
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

function userInput() {
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
      currentWeatherAPI(userArray, "lat_long", loadCity);
      return;
    }
  }

  // All other inputs assumed city string (doesn't work with city, state only)
  getSolar(userText, "name_string");
}

// Adds a listener to the GPS button to allow loading of weather based on GPS coordinates
document.querySelector(".location-icon").addEventListener(
  "click",
  () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadLatLong);
    }
  },
  false
);

// Function to get the latitude and longitude from the browser and load weather
function loadLatLong(result) {
  getSolar([result.coords.latitude, result.coords.longitude], "lat_long");
}

function getSolar(location, locationType) {
  switch (locationType) {
    case "lat_long":
      apiURL = `api/solar/lat_long/${location}`;
      break;
    case "name_string":
    default:
      apiURL = `api/solar/name/${location}`;
      break;
  }
  fetch(URL).then(result => console.log(result));
}
