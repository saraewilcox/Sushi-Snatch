class Game {
    constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameisrunning = true;
    this.sushiArray = [];
    this.backgroundImage = new Image;
    this.counter = 0;
    }
    updateSushi (){
        if (this.counter %180 === 0) { 
          dropSushi();
      }
    }
     loop (){
         this.clearScreen();
         this.backgroundPaint();
         this.updateSushi();
         this.paintSushi();
        //  this.clearScreen;
        //  this.backgroundPaint;
         this.counter ++;
         if (this.gameisrunning) {
            window.requestAnimationFrame((timestamp) => this.loop(timestamp));
            
         }
     } 
     paintSushi (){
         this.sushiArray.forEach(sushi => {
             sushi.draw();
             sushi.dropping();
         })  
     }
     clearScreen (){
        const context = this.ctx;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     }
     backgroundPaint(){
        this.backgroundImage.src = "../sushi_snatch/images/conveyor_belt.jpg";
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
     }
}