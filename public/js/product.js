const tagQuery = event => {
  const tag = event.currentTarget.getAttribute("data-id");
  console.log(`/api/products/${tag}`);
  fetch(`/api/products/${tag}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      const prodContainer = document.querySelector(".product-container");
      prodContainer.innerHTML = "";
      json.forEach(listing => {
        fetch(`/api/products/${listing.listingId}/image`)
          .then(response => {
            return response.json();
          })
          .then(imageURL => {
            const newDiv = document.createElement("div");
            let title = listing.title;
            if (title.length > 150) {
              title = title.substring(0, 150) + "...";
            }
            const titleP = document.createElement("p");
            titleP.textContent = title;
            newDiv.appendChild(titleP);

            let description = listing.description;
            if (description.length > 150) {
              description = description.substring(0, 150) + "...";
            }
            const descriptionP = document.createElement("p");
            descriptionP.textContent = description;
            newDiv.appendChild(descriptionP);

            const imageTag = document.createElement("img");
            imageTag.src = imageURL;
            newDiv.appendChild(imageTag);

            prodContainer.appendChild(newDiv);
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

document.querySelector("#beautyBtn").addEventListener("click", tagQuery, false);
