var navbar = document.getElementById("navbar");

// Change navbar classname on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY !== 0) {
    // On scroll remove normal class and add scroll class
    navbar.classList.remove("navbarRoot");
    navbar.classList.add("navbarRootScroll");
  } else {
    // When user is at the top of the screen, remove scroll class name and add normal classname
    navbar.classList.remove("navbarRootScroll");
    navbar.classList.add("navbarRoot");
  }
});
