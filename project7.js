// Global variables
const hitBall = document.getElementById("hitBall");
const ball = document.getElementById("ball");
const thala = document.getElementById("thala");
const wicket = document.getElementById("wicket");

//randomly generates the left attribute in CSS
let attr = Math.trunc(Math.random() * 16 - 7) * 20;
let abc = Math.trunc(Math.random() * 6 - 3);
document.documentElement.style.setProperty("--left", attr + "%");

//ball div position
const ballPos = ball.getBoundingClientRect();

//thala div position
const thalaPos = thala.getBoundingClientRect();
document.documentElement.style.setProperty("--thalaPos", thalaPos.y + "px");

//wicket div position
const wicketPos = wicket.getBoundingClientRect();
const wicketWidth = wicketPos.width; // Get width of wicket for boundaries

let posY = 0;
let posX = 380;

function cd() {
  switch (abc) {
    case -3:
      return 50;
      break;

    case -2:
      return 160;
      break;
    case -1:
      return 270;
      break;
    case 0:
      return 380;
      break;
    case 1:
      return 490;
      break;
    case 2:
      return 600;
      break;
    case 3:
      return 710;
      break;
    default:
      return 300;
      break;
  }
}
let ef = cd();
//working animate function
// Update the animate function to check for collision
function animate() {
  document.documentElement.style.setProperty("--posY", posY + "px");
  document.documentElement.style.setProperty("--posX", posX + "px");
  document.documentElement.style.setProperty("--leftInit", ef + "px");

  // Update ball position on every frame
  const ballRect = ball.getBoundingClientRect();
  const thalaRect = thala.getBoundingClientRect();

  // Check for collision: thala and ball overlap in Y and X axes
  const isTouchingThala =
    ballRect.bottom >= thalaRect.top && // ball is above thala's top
    ballRect.top <= thalaRect.bottom && // ball is below thala's bottom
    ballRect.left >= thalaRect.left && // ball's left edge is within thala's bounds
    ballRect.right <= thalaRect.right; // ball's right edge is within thala's bounds

  if (isTouchingThala) {
    // Ball is hit by thala
    document.getElementById("ball").style.display = "none";
    document.getElementById("hitBall").style.visibility = "visible";
    document.getElementById("hitBall").classList.add("ball-hit");
    document.getElementById("hitBall").addEventListener("animationend", reset);
  } else if (posY >= wicketPos.y) {
    // Ball hits the wicket
    document.getElementById("ball").classList.add("ball-to-wicket");
    document.getElementById("retry").style.display = "grid";
    document.removeEventListener("keyup", thalaMove);
  } else {
    posY = posY + 1; // Move the ball down
    if (abc <= 0) {
      if (posX !== ef) {
        posX = posX - 1;
      }
    } else {
      if (posX !== ef) {
        posX = posX + 1;
      }
    }
    requestAnimationFrame(animate); // Keep animating
  }
}
animate(); //animate first calling

//resets when ball is out of bound
function reset() {
  document.getElementById("ball").classList.remove("ball-to-wicket");
  document.getElementById("ball").style.display = "block";
  document.getElementById("hitBall").style.visibility = "hidden";
  document.addEventListener("keyup", thalaMove);
  document.getElementById("hitBall").classList.remove("ball-hit");
  document.getElementById("retry").style.display = "none";
  abc = Math.trunc(Math.random() * 6 - 3);
  ef = cd();
  attr = Math.trunc(Math.random() * 16 - 7) * 20;
  document.documentElement.style.setProperty("--left", attr + "%"); //randomly hits ball to left or right
  posY = 0;
  posX = 380;

  animate();
}

//quit button function
function quit() {
  window.close();
}

// Movement control for thala
let thalaX = thala.offsetLeft; // Initial thala X position
const pitchWidth = document.querySelector(".pitch").offsetWidth; // Pitch width
const thalaWidth = thala.offsetWidth; // Thala width for boundary control

const wicketRightBoundary = wicket.offsetWidth - thalaWidth;
// console.log(wicketRightBoundary);
let movementStep = 110; // Step size for each move

function thalaMove(e) {
  if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
    // 'D' key for right
    if (thalaX + movementStep < wicketRightBoundary) {
      thalaX += movementStep;
    }
  } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
    // 'A' key for left
    if (thalaX - movementStep > 0) {
      thalaX -= movementStep;
    }
  }

  thala.style.left = `${thalaX}px`; // Apply new X position directly
}
document.addEventListener("keyup", thalaMove);

console.log(document.getElementById("1").offsetLeft);
console.log(document.getElementById("2").offsetLeft);
console.log(document.getElementById("3").offsetLeft);
