// Footer
var date = new Date();
var footerYear = document.getElementById("footerYear");

footerYear.innerHTML = date.getFullYear();

// Navbar
var navbar = document.getElementById("navbar");

// Change navbar classname on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    // On scroll remove normal class and add scroll class
    navbar.classList.remove("navbarRoot");
    navbar.classList.add("navbarRootScroll");
  } else {
    // When user is at the top of the screen, remove scroll class name and add normal classname
    navbar.classList.remove("navbarRootScroll");
    navbar.classList.add("navbarRoot");
  }
});

//scroll down to bottom of the page
const scrollDown = document.getElementById("scrollDown");

scrollDown.addEventListener("click", function () {
  // Scrolls down to game on button click
  window.scrollBy({ top: 1000, left: 0, behavior: "smooth" });
});
