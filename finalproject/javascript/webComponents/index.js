var featuredGame = document.getElementById("featuredGame");
var featuredGameTitle = document.getElementById("featuredGameTitle")

// Change Featured Game Title on Mouse Hover
featuredGame.addEventListener("mouseover", function () {
  featuredGameTitle.innerHTML = "The Best Platformer"
})

featuredGame.addEventListener("mouseleave", function () {
  featuredGameTitle.innerHTML = "Our Featured Game"
})