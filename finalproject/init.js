// Global Vars
var context,
  rectangle,
  keyListen,
  controller,
  loop,
  canvas_height,
  canvas_width,
  characterSprite;

// define canvas
context = document.querySelector("canvas").getContext("2d");

// define character sprite
characterSprite = new Image();
characterSprite.src = "img/sprites/character.png";
characterSprite.onload = function () {
  
};

context.canvas.height = 300;
context.canvas.width = 650;

canvas_width = context.canvas.width;
canvas_height = context.canvas.height;

rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
};

// check if certain movement keys are being held down
keyListen = (event) => {
  // key_state only true if a key is held down on keyboard
  const key_state = event.type === "keydown" ? true : false;
  switch (event.keyCode) {
    // ARROW KEYS
    case 37:
      controller.left = key_state;
      break;
    case 38:
      controller.up = key_state;
      break;
    case 39:
      controller.right = key_state;
      break;

    // WASD KEYS
    case 87:
      controller.up = key_state;
      break;

    case 68:
      controller.right = key_state;
      break;

    case 65:
      controller.left = key_state;
      break;

    // SPACEBAR
    case 32:
      controller.up = key_state;
      break;
  }
};

// controller for movement
controller = {
  left: false,
  right: false,
  up: false,
  keyListener: keyListen,
};

// loop
loop = () => {
  if (controller.up && rectangle.jumping === false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  // gravity and velocity physics
  rectangle.y_velocity += 1.5;
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;

  // if rectangle is falling below floor
  if (
    rectangle.y >
    canvas_height - rectangle.height - 3 // taking account for the size of the rectangle and the size of the bottom platform
  ) {
    rectangle.jumping = false;
    rectangle.y = canvas_height - rectangle.height - 3; // taking account for the size of the rectangle and the size of the bottom platform
    rectangle.y_velocity = 0;
  }

  // to prevent consistant incrementation of velocity
  rectangle.y_velocity *= 0.96;
  rectangle.x_velocity *= 0.96;

  // context styles
  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvas_width, canvas_height);

  // rectangle styles
  context.fillStyle = "blue";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

  // platform
  context.strokeStyle = "red";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, canvas_height);
  context.lineTo(canvas_width, canvas_height);
  context.stroke();

  // call update
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// call update
window.requestAnimationFrame(loop);
