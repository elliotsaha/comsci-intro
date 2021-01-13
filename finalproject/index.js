var featuredGame = document.getElementById("featuredGame");
var featuredGameTitle = document.getElementById("featuredGameTitle");

// Tab Elements
var homepage = document.getElementById("homepage");
var arcade = document.getElementById("arcade");

// Tab Links
var arcadeLink = document.getElementById("arcadeLink");
var homepageLink = document.getElementById("homepageLink");

// Change Featured Game Title on Mouse Hover
featuredGame.addEventListener("mouseover", function () {
  featuredGameTitle.innerHTML = "The Best Platformer";
});

featuredGame.addEventListener("mouseleave", function () {
  featuredGameTitle.innerHTML = "Our Featured Game";
});

// Tabs
let activeTab = "homepage";
var tabcontent = document.getElementsByClassName("tabContent");

const scrollDown = document.getElementById("scrollDown");

scrollDown.addEventListener("click", function () {
  // Scrolls down to game on button click
  window.scrollBy({ top: 1000, left: 0, behavior: "smooth" });
});

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


function changeTab() {
  // Scroll to top of the screen
  document.documentElement.scrollTop = 0;
  // loop through tabcontent array
  for (var i = 0; i < tabcontent.length; i++) {
    // if tabcontent iterable id not equal to active tab: set to display none
    if (tabcontent[i].id !== activeTab) {
      tabcontent[i].style.display = "none";
    } else {
      // if active tab === tab content iterable: set to display block
      tabcontent[i].style.display = "block";
    }
  }
}

// Set to only one tab during initialization
changeTab();

homepageLink.addEventListener("click", function () {
  activeTab = "homepage";
  changeTab();
});

arcadeLink.addEventListener("click", function () {
  activeTab = "arcade";
  changeTab();
});

