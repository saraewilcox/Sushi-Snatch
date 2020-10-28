let score = 0;
let isSushiArray = ["./images/sushi_1.png", "./images/sushi_4.png", "./images/sushi_5.png", "./images/cat_sushi.png", "./images/cat_sushi_2.png"]

document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('the-canvas');
const ctx = myCanvas.getContext('2d');
let game = new Game (myCanvas);

window.onload = () => {
  startGame();
}

// Start game
function startGame() {
  document.getElementById('game-board').style.display = 'block';
  game.loop()
  const soundToggle = document.getElementById("toggleSound");
  const fxToggle = document.getElementById("toggleFX");
  soundToggle.addEventListener("click", this.handleAudioClick);
  fxToggle.addEventListener("click", this.handleFXClick);
}

function random(min,max){
  return Math.round(Math.random() * (max-min) + min);
}

function dropSushi(){
  let height = (Math.random() * 25) + 50; //length let height = Math.floor(Math.random()*100);
  let velocity = Math.random() * (4 - 1) + 1;  //velocity
  let width = (Math.random() * 25) + 50; //size let width = Math.floor(Math.random()*100);
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

//Places moves on the board
// function chooseDiff() {
// 			if (score < 5) {
//        (difficulty === 'easy') 

// 			  } else if (score >5 && score <10) {
//        (difficulty === 'medium') 

// 				} else {
// 				(difficulty === 'hard')
// 				}
//     }
    
// function getCursorPosition(canvas, event) {
//   const rect = canvas.getBoundingClientRect()
//   const x = event.clientX - rect.left
//   const y = event.clientY - rect.top
//   console.log("x: " + x + " y: " + y)
// }

// const canvas = document.querySelector('canvas')
// canvas.addEventListener('mousedown', function(e) {
//   getCursorPosition(canvas, e)
// })

// function newOrReset(){
//   endGame();
//   StartGame();
// }

///////////////////////////////////////////////////////
// countdown clock:
// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
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

const TIME_LIMIT = 30;
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

function stopDraw(){
  if (score < 0) {
    alert("YOU LOST SOOOOOO MANY SUSHI") //play sad game over sound
  } else if (score === 0) {
    alert("NO SUSHI FOR YOU!")//play I'm so hungry sound
  } else { 
    alert(`YOU SAVED ${score} SUSHIS!`) //play I think I'm turning Japanese
  }
  
  document.getElementById('score').innerHTML = 0;
}

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
