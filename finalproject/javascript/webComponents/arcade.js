const scrollDown = document.getElementById("scrollDown");

scrollDown.addEventListener("click", function () {
    // Scrolls down on button click
    window.scrollBy({ top: 100, left: 0, behavior: "smooth" }); 
})