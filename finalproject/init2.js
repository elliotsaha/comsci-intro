var ctx,
  spriteSize,
  Animation,
  character,
  controller,
  sprite_sheet,
  loop,
  level,
  flag;

// canvas
ctx = document.querySelector("canvas").getContext("2d");
ctx.canvas.height = 300;
ctx.canvas.width = 1100;
// There are 6 sprites for animation, each have a height of 16 pixels and a width of 16 pixels
spriteSize = 64;

// Animation class
Animation = function (frame_set, delay) {
  this.count = 0; // Number of game cycles since last frame change
  this.delay = delay; // number of game cycles to wait until next frame change
  this.frame = 0; // value in sprite sheet, ex. if equal to 0 -> will return the first sprite in spritesheet
  this.frame_index = 0;
  this.frame_set = frame_set; // the current animation frame set, ex. [0,1] will be looping between first and second sprites in spritesheet
};

Animation.prototype = {
  change: function (frame_set, delay = 15) {
    if (this.frame_set != frame_set) {
      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set; // Set the new frame set.
      this.frame = this.frame_set[this.frame_index];
    }
  },
  update: function () {
    this.count++;
    if (this.count >= this.delay) {
      this.count = 0;
      this.frame_index =
        this.frame_index === this.frame_set.length - 1
          ? 0
          : this.frame_index + 1;
      this.frame = this.frame_set[this.frame_index];
    }
  },
};
// Prototype functions that allow the modification of this keyword objects

// Controller for movement
controller = {
  left: false,
  right: false,
  up: false,
  keyListener: (event) => {
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
  },
};

// Charaecter is an object with an animation object
character = {
  animation: new Animation(), // animation value is equal to the Animation class, all Animation class this objects can be modified from this value
  jumping: true,
  height: spriteSize,
  width: spriteSize,
  x: 0,
  y: 40 - 18,
  x_velocity: 0,
  y_velocity: 0,
};

// Spreite sheet object that holds the sprite sheet image and animation frame set arrays

sprite_sheet = {
  frame_sets: [
    [0, 1],
    [2, 3],
    [4, 5],
  ], // 0-1 are frame animations for walking, 2-3 are frame animations for walking to the right, 4-5 are frame animations for walking to the left
  image: new Image(),
};

flag = new Image();
level = 1;
loop = (time_stamp) => {
  if (controller.up && !character.jumping) {
    controller.up = false;
    character.jumping = true;
    character.y_velocity -= 15;
  }

  if (controller.right) {
    character.x_velocity += 0.5;
    character.animation.change(sprite_sheet.frame_sets[1], 15);
  }

  if (controller.left) {
    character.x_velocity -= 0.5;
    character.animation.change(sprite_sheet.frame_sets[2], 15);
  }

  if (!controller.left && !controller.right) {
    character.animation.change(sprite_sheet.frame_sets[0], 20);
  }
  // gravity & velocity physics
  character.y_velocity += 0.75;
  character.x += character.x_velocity;
  character.y += character.y_velocity;
  character.y_velocity *= 0.9;
  character.x_velocity *= 0.9;

  // if rectangle is falling below floor
  if (character.y + character.height > ctx.canvas.height - 13) {
    character.jumping = false;
    character.y = ctx.canvas.height - 13 - character.height;
    character.y_velocity = 0;
  }

  if (character.x + character.width <= 52.5) {
    character.x = 52.5 - character.width;
  } else if (character.x + character.width - 13 >= ctx.canvas.width) {
    character.x = ctx.canvas.width - character.width + 13;
  }

  character.animation.update();

  ctx.fillStyle = "#7ec0ff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#009900";
  ctx.fillRect(0, ctx.canvas.height - 13, ctx.canvas.width, 13);
  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`Level ${1}`, ctx.canvas.width / 2, ctx.canvas.height / 4);
  ctx.drawImage(
    sprite_sheet.image,
    character.animation.frame * spriteSize,
    0,
    spriteSize,
    spriteSize,
    Math.floor(character.x),
    Math.floor(character.y),
    spriteSize,
    spriteSize
  );
  ctx.drawImage(
    ctx.canvas,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );

  // flag
  ctx.drawImage(
    flag,
    ctx.canvas.width - 70,
    ctx.canvas.height - 77,
    spriteSize,
    spriteSize
  );

  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// call update
sprite_sheet.image.addEventListener("load", function (event) {
  // When the load event fires, do this:

  window.requestAnimationFrame(loop); // Start the game loop.
});
sprite_sheet.image.src = "img/animation.png";
flag.src = "img/flag.png";
