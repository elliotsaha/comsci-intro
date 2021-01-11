window.onload = init();

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "87") {
    // up arrow
    console.log("up")
  } else if (e.keyCode == "83") {
    // down arrow
    console.log("down")
  } else if (e.keyCode == "65") {
    // left arrow
    console.log("left")
  } else if (e.keyCode == "68") {
    // right arrow
    console.log("right")
  }
}

function init() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(0, 0);
  ctx.lineTo(c.width, c.height);
  ctx.stroke();
}
