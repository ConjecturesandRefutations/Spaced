class Ship {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 1.25;
    this.width = 30;
    this.height = 50;
    this.img = './images/spaceship.png';
    this.upButtonDown = false;
    this.downButtonDown = false;
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)

    // Event listeners for keyboard controls
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));

    // Throttle the keydown event listeners
    this.throttledUpStart = this.throttle(() => this.startMovingShip('up'), this.throttleDelay);
    this.throttledDownStart = this.throttle(() => this.startMovingShip('down'), this.throttleDelay);
    this.throttledLeftStart = this.throttle(() => this.startMovingShip('left'), this.throttleDelay);
    this.throttledRightStart = this.throttle(() => this.startMovingShip('right'), this.throttleDelay);

    // Event listeners for mobile arrow buttons
    document.getElementById('up-button').addEventListener('touchstart', () => this.startMovingShip('up'));
    document.getElementById('down-button').addEventListener('touchstart', () => this.startMovingShip('down'));
    document.getElementById('left-button').addEventListener('touchstart', () => this.startMovingShip('left'));
    document.getElementById('right-button').addEventListener('touchstart', () => this.startMovingShip('right'));

    document.getElementById('up-button').addEventListener('touchend', () => this.stopMovingShip());
    document.getElementById('down-button').addEventListener('touchend', () => this.stopMovingShip());
    document.getElementById('left-button').addEventListener('touchend', () => this.stopMovingShip());
    document.getElementById('right-button').addEventListener('touchend', () => this.stopMovingShip());
  }

  drawShip() {
    const shipImg = new Image();
    shipImg.src = this.img;
    ctx.drawImage(shipImg, this.x, this.y, this.width, this.height);
  }

  handleKeyDown(event) {
    if (event.keyCode === 38) {
      // up arrow key
      this.upButtonDown = true;
      this.throttledUpStart();
    } else if (event.keyCode === 40) {
      // down arrow key
      this.downButtonDown = true;
      this.throttledDownStart();
    } else if (event.keyCode === 37) {
      // left arrow key
      this.leftButtonDown = true;
      this.throttledLeftStart();
    } else if (event.keyCode === 39) {
      // right arrow key
      this.rightButtonDown = true;
      this.throttledRightStart();
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === 38) {
      // up arrow key
      this.upButtonDown = false;
      this.stopMovingShip();
    } else if (event.keyCode === 40) {
      // down arrow key
      this.downButtonDown = false;
      this.stopMovingShip();
    } else if (event.keyCode === 37) {
      // left arrow key
      this.leftButtonDown = false;
      this.stopMovingShip();
    } else if (event.keyCode === 39) {
      // right arrow key
      this.rightButtonDown = false;
      this.stopMovingShip();
    }
  }

  throttle(callback, delay) {
    let lastCallTime = 0;
    return function () {
      const now = Date.now();
      if (now - lastCallTime >= delay) {
        lastCallTime = now;
        callback.apply(this, arguments);
      }
    };
  }

  startMovingShip(direction) {
    // Move the ship continuously as long as the corresponding button is pressed
    if (direction === 'up' && this.upButtonDown && this.y > 5) {
      this.y -= 3;
    } else if (direction === 'down' && this.downButtonDown && this.y < canvas.height - this.height - 5) {
      this.y += 3;
    } else if (direction === 'left' && this.leftButtonDown && this.x > 5) {
      this.x -= 3;
    } else if (direction === 'right' && this.rightButtonDown && this.x < canvas.width - this.width - 5) {
      this.x += 3;
    }

    // Use requestAnimationFrame to keep moving the ship continuously
    if (this.upButtonDown || this.downButtonDown || this.leftButtonDown || this.rightButtonDown) {
      this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingShip(direction));
    }
  }

  stopMovingShip() {
    // Stop the ship's movement when all buttons are released
    if (!this.upButtonDown && !this.downButtonDown && !this.leftButtonDown && !this.rightButtonDown) {
      cancelAnimationFrame(this.requestAnimationFrame);
    }
  }
}