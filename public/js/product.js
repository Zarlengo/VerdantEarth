// Function to handle the hex button click
const tagQuery = event => {
  // Gets the tag from the data-id of the clicked button
  const tag = event.currentTarget.getAttribute("data-id");

  // Calls the api with the tag
  fetch(`/api/products/${tag}`)
    .then(response => {
      return response.json();
    })
    .then(json => {

      // Object to place ETSY products and empties contents
      const prodContainer = document.querySelector(".product-container");
      prodContainer.innerHTML = "";

      // Cycles through each item returned from the API
      json.forEach(listing => {

        // Creates a new hyperlink object to contain all of the parts of the ETSY product
        const newDiv = document.createElement("a");
        newDiv.setAttribute("class", "card");
        newDiv.setAttribute("href", listing.url);

        // Sets the title and ensures it is not too long
        let title = listing.title;
        if (title.length > 150) {
          title = title.substring(0, 150) + "...";
        }
        const titleSpan = document.createElement("span");
        titleSpan.setAttribute("class", "cardTitle");
        const titleP = document.createElement("p");
        titleP.setAttribute("class", "cardTitle");
        titleP.textContent = title;
        newDiv.appendChild(titleP);
        titleP.appendChild(titleSpan);

        // Set the description and truncates excessive texts
        let description = listing.description;
        if (description.length > 150) {
          description = description.substring(0, 150) + "...";
        }
        const descDiv = document.createElement("div");
        descDiv.setAttribute("class", "cardDesc");
        const descriptionP = document.createElement("p");
        descriptionP.textContent = description;
        newDiv.appendChild(descDiv);
        descDiv.appendChild(descriptionP);

        // Adds the product image to the card
        const imageDiv = document.createElement("div");
        imageDiv.setAttribute("class", "cardImage");
        const imageTag = document.createElement("img");
        imageTag.src = listing.imageURL;
        newDiv.prepend(imageDiv);
        imageDiv.appendChild(imageTag);

        // Adds the product to the html page
        prodContainer.appendChild(newDiv);
      });
    })
    // Capture in case an error happens
    .catch(error => console.log(error));
};

// Add event listeners to each of the hexagon buttons
document
  .querySelector("#kitchenBtn")
  .addEventListener("click", tagQuery, false);

document
  .querySelector("#bathroomBtn")
  .addEventListener("click", tagQuery, false);

document.querySelector("#beautyBtn").addEventListener("click", tagQuery, false);
