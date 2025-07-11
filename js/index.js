const rows = grid.length;
const cols = grid[0].length;

const calculatedCellSize = Math.floor(window.innerHeight / rows);
const minCellSize = 30;
const cellSize =
  calculatedCellSize < minCellSize ? minCellSize : calculatedCellSize;

const route = {
  start: { x: 27, y: 20 },
  end: { x: 40, y: 16 },
};

let gameStarted = true;

// Language data
let lang = "cs";
let strings = undefined;

function preload() {
  strings = loadJSON(`assets/data/lang.json`);
}

function setup() {
  frameRate(30);
  createCanvas(window.innerWidth, window.innerHeight);

  initializePlayer(route.start.x, route.start.y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // if (openingScreen) {
  //   drawOpeningScreen();
  // } else

  if (gameStarted) {
    drawWithCamera(() => {
      drawGrid();

      movePlayer();

      drawPlayer();
    });

    drawModal();

    if (modalStack.length > 0) {
      player.allowedToMove = false;
    } else {
      player.allowedToMove = true;
    }

    // UI elements outside of camera transformation
    startCountdown();
    drawCountdown();
  }
}

function mousePressed() {
  handleModalInput();
}

function touchStarted(event) {
  // If a modal is open, handle modal input and do not move player
  if (typeof getModalStack === "function" && getModalStack().length > 0) {
    handleModalTouchInput();
    return;
  }
  // Player movement touch logic (from player.js)
  if (typeof isMobileDevice === "function" && isMobileDevice()) {
    if (event && event.target && event.target.tagName !== "CANVAS") return;
    if (typeof touchStartX !== "undefined") touchStartX = mouseX;
    if (typeof touchStartY !== "undefined") touchStartY = mouseY;
    if (typeof isTouching !== "undefined") isTouching = true;
  }
}
