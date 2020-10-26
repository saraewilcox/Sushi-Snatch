let score = 0;
let color = "purple";
document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('the-canvas');
const ctx = myCanvas.getContext('2d');

// let background = false;
// let backgroundImage = new Image();
// backgroundImage.onload = function () {
//   background = true;
// };
//backgroundImage.src = "./images/conveyor_belt.jpg";
let game = new Game (myCanvas);
//document.getElementById('start-button').onclick = () => {
window.onload = () => {
  startGame();
}
//Load it up
// window.onload = () => {
//     let canvas = document.getElementById("mycanvas");
//     ctx = canvas.getContext("2d");
//     ctx.canvas.width = WIDTH;
//     ctx.canvas.height = HEIGHT;
//     stage = new createjs.State("game-board");
//   };
//};
// Start game
function startGame() {
  document.getElementById('game-board').style.display = 'block';
  game.loop()
}
/////////////////////////////////////////////////////////////////////////////////
// function random(min,max){
//  	return Math.round(Math.random() * (max-min) + min);
// }
//Get random images of either sushi or not sushi

  // if (Math.round(Math.random())){
  //   return "https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-24-Sushi-icon.png";
  // } else {
  //   return "https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-14-Thorn-icon.png";
  // }

let randomnumber = Math.round(Math.random());

function dropSushi(){
  let width = Math.floor(Math.random()*100); //length
  let velocity = Math.floor(Math.random()* 4); //velocity
  let height = Math.floor(Math.random()*100); //size
  game.sushiArray.push(new Sushi(game, width, velocity, height, randomnumber))
}
  //let thisSushi = $("<div/>", {
  //  class: "sushi",
    //style:  'width: ${size}px; height: ${size}px; left: ${length}px; transition: transform ${velocity} ms linear;' 
    //style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
  //});
  
  //set data and bg based on data
  //TOOK THIS OUT AFTER ANDRE BECAUSE THE OBJECT IS DOING IT
  // thisSushi.data("test", Math.round(Math.random()));
  // if(thisSushi.data("test")){
  //   thisSushi.css({"background": "url(images/sushi_1.JPG)", "background-size":"contain"});
  // } else {
  //   thisSushi.css({"background": "url(images/cat_sushi.jpg)", "background-size":"contain"});
  // }
  // if(thisSushi.data("test")){
  //   thisSushi.css({"background": "url('https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-24-Sushi-icon.png')", "background-size":"contain"});
  // } else {
  //   thisSushi.css({"background": "url('https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-14-Thorn-icon.png')", "background-size":"contain"});
  // }
  
  //insert gift element
  //$(".game").append(thisSushi);
  
  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

  //random start for animation
  //CHANGED thisSushi to this.Sushi AFTER ANDRE - then it gives cannot read addClass error
  //so i wrapped it in a function. still error -- PUT THIS MOVEMENT INTO THE OBJECT!!
  // $(setTimeout(function(){
  //   this.Sushi.addClass("move"); 
  // }), random(0, 5000) );
  
  //remove this object when animation is over
  //AFTER ANDRE I REMOVED THIS FOR TESTING - PUT THIS INTO THE OBJECT TOO???
//   thisSushi.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
//               function(event) {
//     $(this).remove();
//   });

// for (i = 0; i < 10; i++) { 
//   dropSushi();
// }

//scoring:
$(document).on('click', '.sushi', function(){

  
  if($(this).data("test")){
    score += 1;
  } else {
    score -= 1;
  }
  
  $(".score").html(score);
  $(this).remove();
});

// let runGame = setInterval(function(){
//                 for (i = 0; i < 10; i++) { 
//                   dropSushi();
//                 }  
//               }, 5000);
//
//
//
// let score = 0;
// let color = "purple";
// ////////////////////////////////////////////////////////////////////////////////
// // Start game
// function startGame() {
//   let canvas = document.getElementById("canvas");
// }
// //Load it up
// window.onload = () => {

//   document.getElementById("navbar-toggler").onclick = () => {
//     startGame();
//   };
// };
// /////////////////////////////////////////////////////////////////////////////////
// function random(min,max){
//  	return Math.round(Math.random() * (max-min) + min);
// }
// //Get random images of either sushi or not sushi
// function setBackground(){
//   // if (Math.round(Math.random())){
//   //   return "../sushi-snatch/images/sushi_1.JPG";
//   // } else {
//   //   return "../sushi-snatch/images/cat_sushi.jpg";
//   // }
//   if (Math.round(Math.random())){
//     return "https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-24-Sushi-icon.png";
//   } else {
//     return "https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-14-Thorn-icon.png";
//   }
// }
              // function dropBox(){
              //   let length = random(100, ($(".game").width() - 100));
              //   let velocity = random(850, 8000);
              //   let size = random(50, 150);
              //   let thisBox = $("<div/>", {
              //     class: "box",
              //     style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
              //   });
                
              //   //set data and bg based on data
              //   thisBox.data("test", Math.round(Math.random()));
              //   // if(thisBox.data("test")){
              //   //   thisBox.css({"background": "../sushi-snatch/images/sushi_1.JPG", "background-size":"contain"});
              //   // } else {
              //   //   thisBox.css({"background": "../sushi-snatch/images/cat_sushi.jpg", "background-size":"contain"});
              //   // }
              //   if(thisBox.data("test")){
              //     thisBox.css({"background": "url('https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-24-Sushi-icon.png')", "background-size":"contain"});
              //   } else {
              //     thisBox.css({"background": "url('https://icons.iconarchive.com/icons/klukeart/cubes/512/Box-14-Thorn-icon.png')", "background-size":"contain"});
              //   }
                
              //   //insert gift element
              //   $(".game").append(thisBox);
                
              //   //random start for animation
              //   setTimeout(function(){
              //     thisBox.addClass("move");
              //   }, random(0, 5000) );
                
              //   //remove this object when animation is over
              //   thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              //               function(event) {
              //     $(this).remove();
              //   });
              // }
              
              // for (i = 0; i < 10; i++) { 
              //   dropBox();
              // }
              
              // //scoring:
              // $(document).on('click', '.box', function(){
              
                
              //   if($(this).data("test")){
              //     score += 1;
              //   } else {
              //     score -= 1;
              //   }
                
              //   $(".score").html(score);
              //   $(this).remove();
              // });
              
              // let runGame = setInterval(function(){
              //                 for (i = 0; i < 10; i++) { 
              //                   dropBox();
              //                 }  
              //               }, 5000);