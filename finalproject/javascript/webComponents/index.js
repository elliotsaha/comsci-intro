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
