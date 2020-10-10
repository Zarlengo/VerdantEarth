let slideIndex = 0;
const slideTimer = 5000; // Change image every 5 seconds
showSlides();

// Function to hide and show the articles
function showSlides() {
  let i;
  const slides = document.querySelectorAll(".article-card");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, slideTimer);
}

// Listener for the user to click on the article card
document.querySelector(".article-cards").addEventListener("click", data => {
  data.preventDefault();
  const url = data.path[1].attributes[2].nodeValue;
  window.open(url, "_blank");
});
