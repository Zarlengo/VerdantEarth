let slideIndex = 0;
showSlides();

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
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

document.querySelector(".article-cards").addEventListener("click", data => {
  data.preventDefault();
  const url = data.path[1].attributes[2].nodeValue;
  window.open(url, "_blank");
});
