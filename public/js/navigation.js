// Function to open and close the navbar menu
function toggleMenu() {
  const menuToggle = document.querySelector(".menuToggle");
  const navigation = document.querySelector(".navigation");
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}

// Adds an event listener to the navbar arrow
document
  .querySelector(".menuToggle")
  .addEventListener("click", toggleMenu, false);
