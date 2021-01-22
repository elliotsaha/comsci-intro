var ctx,
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
ctx = document.querySelector("canvas").getContext("2d");
ctx.canvas.height = 300;
ctx.canvas.width = 1100;

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

// Prototype functions inside of the functional Animation class that can manipulate this (keyword)
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

// function to recieve the dimensions of any object
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

// Character is an object with an animation object
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
    return getDimensions(this);
  },
};

// Sprite sheet object that holds the sprite sheet image and animation frame set arrays
sprite_sheet = {
  frame_sets: [
    [0, 1],
    [2, 3],
    [4, 5],
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
    return getDimensions(this);
  },
};

// Level integer
level = 1;

switchLevel = () => {
  // level is incremented and charecter position is reset
  level++;
  character.x = 0;
  character.y = ctx.canvas.height - 13 - 64; // height of the canvas - ground height - character height
};

// main Loog
loop = () => {
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

  // flag collision detection
  if (
    character.dimensions().right > flag.dimensions().left ||
    character.dimensions().left > flag.dimensions().right
  ) {
    switchLevel();
  }

  // check if level === 4
  gameFinish = false;

  // change platform objects in accordance to the level value
  if (level === 1) {
    platforms = [
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
        // if the character's x position + width is less than the x position + width of the platform AND the character's x position is less the x position of the platform, trigger this code block (this is for collision detection on the bottom of the platform and top of the character )
        character.dimensions().right <= dimensions.right &&
        character.dimensions().left >= dimensions.left
      ) {
        character.y_velocity = 0;
        character.y = dimensions.bottom;
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
sprite_sheet.image.src = "img/animation.png";
flag.image.src = "img/flag.png";
