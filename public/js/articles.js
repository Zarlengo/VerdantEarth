let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  console.log("showing");
  const slides = document.querySelector(".article-card");
  for (i = 0; i < slides.length; i++) {
    slides[i].addClass("article-hide");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].addClass("article-block");
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
