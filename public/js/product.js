const tagQuery = event => {
  const tag = event.currentTarget.getAttribute("data-id");
  fetch(`/api/products/${tag}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const prodContainer = document.querySelector(".product-container");
      prodContainer.innerHTML = "";
      json.forEach(listing => {
        const newDiv = document.createElement("a");
        newDiv.setAttribute("class", "card");
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

        const imageDiv = document.createElement("div");
        imageDiv.setAttribute("class", "cardImage");
        const imageTag = document.createElement("img");
        imageTag.src = listing.imageURL;
        newDiv.prepend(imageDiv);
        imageDiv.appendChild(imageTag);

        const urlDiv = document.createElement("div");
        urlDiv.setAttribute("class", "cardURL");

        newDiv.setAttribute("href", listing.url);

        prodContainer.appendChild(newDiv);
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
