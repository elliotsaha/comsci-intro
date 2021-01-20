var ctx, spriteSize, Animation, character, controller, sprite_sheet, loop;

// canvas
ctx = document.querySelector("canvas").getContext("2d");

// There are 6 sprites for animation, each have a height of 16 pixels and a width of 16 pixels
spriteSize = 16;

// Animation class
Animation = function (frame_set, delay) {
  this.count = 0; // Number of game cycles since last frame change
  this.delay = delay; // number of game cycles to wait until next frame change
  this.frame = 0; // value in sprite sheet, ex. if equal to 0 -> will return the first sprite in spritesheet
  this.frame_index = 0;
  this.frame_set = frame_set; // the current animation frame set, ex. [0,1] will be looping between first and second sprites in spritesheet
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

// Character model
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
  frame_set: [
    [0, 1],
    [2, 3],
    [4, 5],
  ], // 0-1 are frame animations for walking, 2-3 are frame animations for walking to the right, 4-5 are frame animations for walking to the left
  image: new Image(),
};

loop = function (time_stamp) {};
