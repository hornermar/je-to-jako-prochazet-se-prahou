const rows = grid.length;
const cols = grid[0].length;

const calculatedCellSize = Math.floor(window.innerHeight / rows);
const minCellSize = 40;
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

function touchStarted() {
  handleModalTouchInput();
}
