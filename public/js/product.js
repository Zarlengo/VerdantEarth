const tagQuery = event => {
  const tag = event.target.getAttribute("data-id");
  fetch(`/api/products/${tag}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      json.forEach(listing => {
        console.log(listing.listingId);
        fetch(`/api/products/${listing.listingId}/image`)
          .then(response => {
            return response.json();
          })
          .then(imageURL => {
            const title = listing.title;
            const titleP = document.createElement("p");
            titleP.textContent = title;

            const description = listing.description;
            const descriptionP = document.createElement("p");
            descriptionP.textContent = description;

            const imageTag = document.createElement("img");
            imageTag.src = imageURL;

            // NEED TO PUT CODE TO INSERT INTO HTML HERE
          })
          .catch(error => console.log(error));
      });
    })
    .catch(error => console.log(error));
};

document
  .querySelector("#kitchenBtn")
  .addEventListener("click", tagQuery, false);

document
  .querySelector("#bathroomBtn")
  .addEventListener("click", tagQuery, false);
