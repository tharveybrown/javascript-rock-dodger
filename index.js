/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const ROCK_HEIGHT = 20


var gameInterval = null

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 40;

    let collisionOne = rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge;
    let collisionTwo = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge;
    let collisionThree = rockLeftEdge <= dodgerRightEdge && rockRightEdge > dodgerRightEdge;

    return ( collisionOne || collisionTwo || collisionThree)
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0;

  rock.style.top = top;
  GAME.appendChild(rock);  
  
  function moveRock() {
    rock.style.top = `${top +=2}px`

    if(checkCollision(rock)){
      return endGame();
    } 
    
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  rocks = document.querySelectorAll('.rock')
  for(let i = 0; i < rocks.length; i++) {
    rocks[i].remove()
  }
  window.removeEventListener('keydown', moveDodger)
  START.style.display = 'inline-block'
  return alert("YOU LOSE!")
}

function moveDodger(e) {

  var key = e.which
  if (key === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  }

  if (key === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    var left = positionToInteger(DODGER.style.left); 
    if(left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    var left = positionToInteger(DODGER.style.left); 
    if(left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  })
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
