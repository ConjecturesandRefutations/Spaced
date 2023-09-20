class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.img = './images/asteroid.png'
    }

    drawObstacle(){
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
      }
    }