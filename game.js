class Game {
    constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameisrunning = true;
    this.sushiArray = [];
    this.backgroundImage = new Image;
    this.counter = 0;
    // this.handleAudioClick = this.handleAudioClick.bind(this);
    // this.handleFXClick = this.handleFXClick.bind(this);
    this.sound = false;
    }

//     updateSushi (){
//         if (difficulty === 'easy') {
//         (this.counter %40 === 0) { 
//           dropSushi();
//       } else if (difficulty === 'medium') {
//         (this.counter %30 === 0) {
//             dropSushi();
//         } else {
//         (this.counter %20 === 0) {
//             dropSushi();
//         }
//     }
// }
// }

    updateSushi (){
        if (this.counter %30 === 0) { 
          dropSushi();
      }
    }

     loop (){
         this.clearScreen();
         this.backgroundPaint();
         this.updateSushi();
         this.paintSushi();
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
        this.backgroundImage.src = './images/conveyor_belt.jpg';
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
     }
}