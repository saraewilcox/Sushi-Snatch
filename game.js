class Game {
    constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameisrunning = true;
    this.sushiArray = [];
    this.backgroundImage = new Image;
    this.counter = 0;
    this.level = 1;
    this.sound = false;
    this.isPause = false;
    }

    setLevel(level) {
        this.level = level;
    }

    updateSushi (){//frequency
        switch (this.level) {
            case 1 : if (this.counter %300 === 0) { 
                dropSushi(); break;
            } 
            case 2 : if (this.counter %100 === 0) { 
                dropSushi(); break;
            }
            case 3 : if (this.counter %50 === 0) { 
                dropSushi(); break;
            }
        } 
    }
    
    loop (){
        this.clearScreen();
        this.backgroundPaint();
        this.updateSushi();
        this.paintSushi();
        this.counter ++;
        if (!game.isPause) {
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
        this.backgroundImage.src = './images/conveyor.jpg';
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
}