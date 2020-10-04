const kitchenBtn = document.querySelector("#kitchenBtn");

kitchenBtn.addEventListener("click", event => {
  event.preventDefault();
  alert("I have been clicked");

  fetch("/api/products/kitchen")
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);

      const title = json.title;
      const titleP = document.createElement("p");
      titleP.textContent = title;

      const description = json.description;
      const descriptionP = document.createElement("p");
      descriptionP.textContent = description;

      const image = json.url;
      const imageTag = document.createElement("img");
      imageTag.src = image;
    });
});
