var featuredGame = document.getElementById("featuredGame");
var featuredGameTitle = document.getElementById("featuredGameTitle")

// Tabs
var homepage = document.getElementById("homepage")
var arcade = document.getElementById("arcade")

// Tab Links
var arcadeLink = document.getElementById("arcadeLink")

var homepageLink = document.getElementById("homepageLink")

// Change Featured Game Title on Mouse Hover
featuredGame.addEventListener("mouseover", function () {
  featuredGameTitle.innerHTML = "The Best Platformer"
})

featuredGame.addEventListener("mouseleave", function () {
  featuredGameTitle.innerHTML = "Our Featured Game"
})

// Tab Content Opener

homepageLink.addEventListener("click", function () {
  homepage.classList.remove("tabContent")
  homepage.classList.add("tabContentActive")
  arcade.classList.add("tabContent")
  arcade.classList.remove("tabContentActive")
  console.log(homepage.classList)
})

arcadeLink.addEventListener("click", function  () {
  arcade.classList.remove("tabContent")
  arcade.classList.add("tabContentActive")
  homepage.classList.add("tabContent")
  homepage.classList.remove("tabContentActive")
  console.log(arcade.classList)
})