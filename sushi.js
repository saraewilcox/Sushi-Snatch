class Sushi {
    constructor(game, height, velocity, width, src, isCat) { 
      this.x = (Math.random() * (225 - 25) + 400);//drops objects only at start of conveyor belt 
      this.y = 0;
      this.width = width;
      this.velocity = velocity;
      this.frequency = 1;
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
    
    setVelocity(velocity) {
      this.velocity=velocity;
    }

    dropping() {
      if (this.x < 475) {
        this.x--;
        this.y += this.velocity;
      } else if (this.x >= 475 && this.x < 575) {
        this.y += this.velocity;
      } else {
        this.x++;
        this.y+= this.velocity;
      }
    }

  }
