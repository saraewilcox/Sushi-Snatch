// Sushi
class Sushi {
    constructor(game, width, velocity, height, isSushi) {
      this.x = Math.floor(Math.random() * 1100); //figure out how to change the canvas to not hard code!!!!
      this.y = 0;
      this.width = width;
      this.velocity = velocity;
      this.height = height;
      this.image = new Image();
      this.image.src = "";
      this.isSushi = isSushi;
      this.game = game;
    }
    draw() {
      //console.log(this.game);
      if (this.isSushi) {
        this.image.src = "./images/sushi_1.jpg";
      } else {
        this.image.src = "./images/cat_sushi.jpg";
      }
      
      this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // context.drawImage(
      //   this.image,
      //   this.x,
      //   this.y - this.height,
      //   this.width,
      //   this.height
      // );
      // this.y += 4;
      // if (this.y >= this.height) this.y = 0;
    }
    
    dropping() {
        this.y += this.velocity;
    }

    // $(setTimeout(function(){
    //   this.isSushi.addClass("move"); 
    // }), random(0, 5000) );

    // this.isSushi("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    // function(event) {
    //   $(this).remove();
    // });

  }
