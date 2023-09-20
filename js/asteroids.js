class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.img = './images/asteroid.png';
        this.destroyed = false;
        this.wasHit = false; // Track if the obstacle was hit
        this.explosionFrames = 10; // Number of frames to display the explosion
        this.currentExplosionFrame = 0; // Current explosion frame
        this.explosionImage = new Image();
        this.explosionImage.src = './images/explosion.png';
    }

    drawObstacle() {
      if (this.wasHit && this.currentExplosionFrame < this.explosionFrames) {
        // Display the explosion image
        ctx.drawImage(
          this.explosionImage,
          this.x,
          this.y,
          this.width,
          this.height
        );
        this.currentExplosionFrame++;
      } else {
        // Draw the asteroid image
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
      }
    }

      collidesWith(x, y) {
        return (
          x < this.x + this.width &&
          x + this.width > this.x &&
          y < this.y + this.height &&
          y + this.height > this.y
        );
      }

      destroy() {
        this.destroyed = true;
        this.wasHit = true; // Mark the obstacle as hit
      }

    }