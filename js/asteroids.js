class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.img = './images/asteroid.png'
        this.destroyed = false;
    }

    drawObstacle(){
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
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
      }
    

    }