// Sushi - its really all the items falling here:
class Sushi {
    constructor(game, height, velocity, width, src, isCat) {
      this.x = Math.floor(Math.random() * myCanvas.width); //1050
      this.y = 0;
      this.width = width;
      this.velocity = velocity;
      this.height = height;
      this.image = new Image();
      this.image.src = src;
      this.isCat = isCat
      this.game = game;
    }

    draw() {
      this.game.ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
      this.game.ctx.restore();
    }
    
    dropping() {
        this.y += this.velocity;
    }
  }
