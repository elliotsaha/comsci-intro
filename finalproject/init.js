var canvas,
  ctx,
  spriteSize,
  Animation,
  character,
  controller,
  sprite_sheet,
  loop,
  level,
  flag,
  getDimensions,
  switchLevel,
  platforms,
  gameFinish;

// canvas
canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d"); // context of the canvas
ctx.canvas.height = 300; // height of the canvas
ctx.canvas.width = 1100; // width of the canvas

// There are 6 sprites for animation, each have a height of 16 pixels and a width of 16 pixels
spriteSize = 64;

// Animation functional class
Animation = function (frame_set, delay) {
  // Constructor
  this.count = 0; // Number of game cycles since last frame change
  this.delay = delay; // number of game cycles to wait until next frame change
  this.frame = 0; // value in sprite sheet, ex. if equal to 0 -> will return the first sprite in spritesheet
  this.frame_index = 0;
  this.frame_set = frame_set; // the current animation frame set, ex. [0,1] will be looping between first and second sprites in spritesheet
};

// Prototype functions inside of the functional Animation class that can manipulate this (keyword) properties

/* This changes the current animation frame set. For example, if the current frame set is [2, 3], and the new frame set is [4, 5], it changes the frame set to [4, 5]. It also sets the delay. */

Animation.prototype = {
  change: function (frame_set, delay = 15) {
    if (this.frame_set != frame_set) {
      this.count = 0; // Resets the count
      this.delay = delay; // Sets delay
      this.frame_index = 0; // Start at the first frame in the new frame set
      this.frame_set = frame_set; // Set the new frame set.
      this.frame = this.frame_set[this.frame_index]; // set the new frame value (this.frame_index is the index position in the array of frame positions)
    }
  },

  // this is called on each game cycle
  update: function () {
    this.count++; // keeps track of how many cycles have passed since the last frame change
    if (this.count >= this.delay) {
      // change the frame if enough cycles have set
      this.count = 0; // reset the count in the frame array
      this.frame_index = // if the frame index is on the last value of the frame set -> reset to 0, otherwise add 1 to the index
        this.frame_index === this.frame_set.length - 1
          ? 0
          : this.frame_index + 1;
      this.frame = this.frame_set[this.frame_index]; // changes the current frame value
    }
  },
};

// function to recieve the dimensions of any rectangle
getDimensions = function ({ x, y, width, height }) {
  return {
    top: y,
    right: x + width,
    left: x,
    bottom: y + height,
  };
};

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

// Character is a rectangular object with an animation object
character = {
  animation: new Animation(), // animation value is equal to the Animation class, all Animation class this objects can be modified from this value
  jumping: true,
  height: spriteSize,
  width: spriteSize,
  x: 0,
  y: ctx.canvas.height - 13 - 64,
  x_velocity: 0,
  y_velocity: 0,
  dimensions: function () {
    return getDimensions(this); // this refers to all other properties in character, -> x, y, width, and height
  },
};

// Sprite sheet object that holds the sprite sheet image and animation frame set arrays
sprite_sheet = {
  frame_sets: [
    [0, 1], // standing still
    [2, 3], // walking right
    [4, 5], // walking left
  ], // 0-1 are frame animations for walking, 2-3 are frame animations for walking to the right, 4-5 are frame animations for walking to the left
  image: new Image(),
};

// Flag object
flag = {
  image: new Image(),
  x: ctx.canvas.width - 70,
  y: ctx.canvas.height - 77,
  width: spriteSize,
  height: spriteSize,
  dimensions: function () {
    return getDimensions(this); // this refers to all other properties in character, -> x, y, width, and height
  },
};

// Level integer
level = 1;

// whenever this function is called, it increments the level integer, and resets the character
switchLevel = () => {
  // level is incremented and character position is reset
  level++;
  character.x = 0;
  character.y = ctx.canvas.height - 13 - 64; // height of the canvas - ground height - character height
};

// Main Loop
loop = () => {
  // jumping logic (making character go up by negating the y_velocity of the character)
  if (controller.up && !character.jumping) {
    controller.up = false;
    character.jumping = true;
    character.y_velocity -= 15;
  }

  // x velocity is increased when the character is walking to the right
  if (controller.right) {
    character.x_velocity += 0.5;
    character.animation.change(sprite_sheet.frame_sets[1], 15); // Calling animation.change function changes the frame set index, in this case it's set to the 2nd frame set (moving to the right) with a delay of 15
  }

  // x velocity is set to negative value to go backwards
  if (controller.left) {
    character.x_velocity -= 0.5;
    character.animation.change(sprite_sheet.frame_sets[2], 15);
  }

  if (!controller.left && !controller.right) { // if not walking right and not walking left, then standing still
    character.animation.change(sprite_sheet.frame_sets[0], 20);
  }
  // gravity & velocity physics, on every frame multiply both the x, and y velocity by 0.9 which slowly drops them to zero
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

  // logic for if character is attempting to go past the left and right borders of the canvas, this code block stops them from going past the boundry walls
  if (character.x + character.width <= 52.5) {
    character.x = 52.5 - character.width;
  } else if (character.x + character.width - 13 >= ctx.canvas.width) {
    character.x = ctx.canvas.width - character.width + 13;
  }

  // simple flag collision detection
  if (
    character.dimensions().right >= flag.dimensions().left ||
    character.dimensions().left >= flag.dimensions().right
  ) {
    switchLevel(); // switch level if character interacts with the flag
  }

  // boolean that checks if game if finished or not (passed three levels)
  gameFinish = false;

  // change platform objects in accordance to the level value
  if (level === 1) {
    platforms = [
      // these objects are individual platforms
      {
        width: 150,
        height: 25,
        x: 200,
        y: ctx.canvas.height - 70,
      },
      {
        width: 50,
        height: 25,
        x: 390,
        y: ctx.canvas.height - 120,
      },
      {
        width: 90,
        height: 25,
        x: 450,
        y: ctx.canvas.height - 180,
      },
      {
        width: 90,
        height: 25,
        x: 650,
        y: ctx.canvas.height - 85,
      },
    ];
  } else if (level === 2) {
    platforms = [
      {
        width: 100,
        height: 25,
        x: 100,
        y: ctx.canvas.height - 75,
      },
      {
        width: 110,
        height: 25,
        x: 200,
        y: ctx.canvas.height - 145,
      },
      {
        width: 35,
        height: 25,
        x: 320,
        y: ctx.canvas.height - 100,
      },
      {
        width: 110,
        height: 25,
        x: 400,
        y: ctx.canvas.height - 145,
      },
      {
        width: 90,
        height: 25,
        x: 550,
        y: ctx.canvas.height - 85,
      },
      {
        width: 110,
        height: 25,
        x: 700,
        y: ctx.canvas.height - 65,
      },
      {
        width: 30,
        height: 25,
        x: 850,
        y: ctx.canvas.height - 105,
      },
    ];
  } else if (level === 3) {
    platforms = [
      {
        width: 100,
        height: 25,
        x: 180,
        y: ctx.canvas.height - 75,
      },
      {
        width: 100,
        height: 25,
        x: 350,
        y: ctx.canvas.height - 125,
      },
      {
        width: 50,
        height: 25,
        x: 500,
        y: ctx.canvas.height - 165,
      },
      {
        width: 50,
        height: 25,
        x: 600,
        y: ctx.canvas.height - 75,
      },
      {
        width: 80,
        height: 25,
        x: 700,
        y: ctx.canvas.height - 125,
      },
    ];
  } else if (level === 4) {
    // thank you for playing screen, character is not movable and all objects removed
    gameFinish = true;
    character.x_velocity = 0;
    character.x = ctx.canvas.width / 2 - character.width + 15;
    character.y = ctx.canvas.height - 13 - character.height;
    character.y_velocity = 0;
    platforms = [];
    flag.width = 0;
    flag.height = 0;
  }
  character.animation.update();
  ctx.fillStyle = "#7ec0ff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#009900";
  ctx.fillRect(0, ctx.canvas.height - 13, ctx.canvas.width, 13);
  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  // if game is finished, show thanks for playing instead of level in the center top of the screen
  ctx.fillText(
    !gameFinish ? `Level ${level}` : "Thanks For Playing!",
    ctx.canvas.width / 2,
    ctx.canvas.height / 4
  );
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
  ctx.drawImage(flag.image, flag.x, flag.y, flag.width, flag.height);

  for (i = 0; i < platforms.length; i++) {
    const dimensions = getDimensions(platforms[i]);

    if (
      // character is in collision with any platform
      character.dimensions().bottom >= dimensions.top &&
      character.dimensions().top <= dimensions.bottom &&
      character.dimensions().right >= dimensions.left &&
      character.dimensions().left <= dimensions.right
    ) {
      // check if character is higher than the top of the platform plus an extra 56 pixels (this is to prevent triggering the right side / left side collision code)
      if (character.y <= dimensions.top - 56) {
        character.jumping = false;
        character.y = dimensions.top - character.height;
        character.y_velocity = 0;
      } else if (
        // if the character's x position + width is greater than the x position + width of the platform AND the character's x position is less the x position of the platform, OR the opposite, trigger this code block (this is for collision detection on the bottom of the platform and top of the character)
        (character.dimensions().right >= dimensions.right &&
          character.dimensions().left <= dimensions.left) ||
        (character.dimensions().right <= dimensions.right &&
          character.dimensions().left >= dimensions.left)
      ) {
        character.y_velocity = 0;
        character.dimensions().top = dimensions.bottom;
      } else if (
        // Simple check for left right side collision detection, if the characters x position plus their width is greater than the platforms x position and less than the platforms x position + it's width, execute.
        character.dimensions().right >= dimensions.left &&
        character.dimensions().right <= dimensions.right
      ) {
        character.x = dimensions.left - character.width;
      } else if (
        character.dimensions().left <= dimensions.right &&
        character.dimensions().left >= dimensions.left
      ) {
        character.x = dimensions.right;
      }
      // else if (character.dimensions().top === dimensions.bottom) {
      //   character.y_velocity = 0;
      //   character.y = dimensions.bottom;
      // }
    }

    ctx.fillStyle = "#013f92";
    ctx.fillRect(
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height
    );
  }
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// call update
sprite_sheet.image.addEventListener("load", function (event) {
  // When the load event fires, do this:

  window.requestAnimationFrame(loop); // Start the game loop.
});
// loading the image sources for the sprite_sheet and the flag
sprite_sheet.image.src = "img/animation.png";
flag.image.src = "img/flag.png";
