let score = 0;
let isSushiArray = ["./images/sushi_1.png", "./images/sushi_4.png", "./images/sushi_5.png", "./images/cat_sushi.png", "./images/cat_sushi_2.png"]

document.getElementById('gameboard').style.display = 'none';
const myCanvas = document.getElementById('thecanvas');
const ctx = myCanvas.getContext('2d');
let game = new Game (myCanvas);
let level = 1;
let modeButtons = document.querySelectorAll(".mode");

window.onload = () => {
  //startGame();
  init();
}
init();
function init(){
  setUpModeButtons();
}

//set up easy, medium, hard buttons
function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
      
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
        resetGame();
				game.setLevel(1)
			} else if(this.textContent === "Medium"){
        resetGame();
				game.setLevel(2);
			} else if(this.textContent === "Impossible"){
        resetGame();
				game.setLevel(3);
			}
			startGame();
		});
	}
}

// Start game
function startGame() {
  document.getElementById('gameboard').style.display = 'block';
  game.loop()
  const soundToggle = document.getElementById("toggleSound");
  soundToggle.addEventListener("click", this.handleAudioClick);
}

function random(min,max){
  return Math.round(Math.random() * (max-min) + min);
}

function dropSushi(){
  let height = (Math.random() * 25) + 50; 
  let velocity = 0

  switch (game.level) {
    case 1 : velocity=(Math.random() * (2 - 1) + 1); 
        break;

    case 2 : velocity=(Math.random() * (6 - 1) + 1);
        break;
    
    case 3 : velocity=(Math.random() * (10 - 1) + 1);
    break;
    }

  let width = (Math.random() * 25) + 50; 


  let randomElement = isSushiArray[Math.floor(Math.random() * isSushiArray.length)]
  
  //console.log(randomElement)
  let isCat = randomElement.includes('cat')

  game.sushiArray.push(new Sushi(game, height, velocity, width, randomElement, isCat))
}

myCanvas.addEventListener('mousedown', event => {
  game.sushiArray.forEach((element, index) => {
    if(event.layerX > element.x && event.layerX < (element.x + element.width) && event.layerY > element.y && event.layerY < (element.y + element.height)) {
      if(element.isCat) {
        score -=1;
        document.getElementById('score').innerHTML = score;
        //console.log(`that's a cat`)
      } else {
        game.sushiArray.splice(index, 1)
        score +=1;
        document.getElementById('score').innerHTML = score;
        //console.log('sushi time')
      }
    }
  })
})

function resetGame() {
  clearInterval(startTimer);
  score = 0;
  this.isRunning = false;
  //timeLeft = 0;
  startTimer = null;

  //document.getElementById("timeLeft").innerHTML = timeLeft;
}
///////////////////////////////////////////////////////
// countdown clock:
// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "grey"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 30;//seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      stopDraw();
    }
  }, 1000);
}
/////////////////////////////////RE-DO THIS TO NOT BE ALERTS!!!!!!!!!!!!!!!!
// function stopDraw(){
//   if (score < 0) {
//     alert("YOU LOST SOOOOOO MANY SUSHI") //play sad game over sound
//   } else if (score === 0) {
//     alert("NO SUSHI FOR YOU!")//play I'm so hungry sound
//   } else { 
//     alert(`YOU SAVED ${score} SUSHIS!`) //play I think I'm turning Japanese
//   }
//   this.isRunning=false;
//   document.getElementById('score').innerHTML = 0;
// }

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}