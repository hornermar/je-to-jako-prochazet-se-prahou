const rows = grid.length;
const cols = grid[0].length;

const calculatedCellSize = Math.floor(window.innerHeight / rows);

const cellSize =
  calculatedCellSize < GRID_CONFIG.MIN_CELL_SIZE
    ? GRID_CONFIG.MIN_CELL_SIZE
    : calculatedCellSize;

const route = {
  start: { x: 27, y: 20 },
  end: { x: 40, y: 16 },
};

let gameStarted = true;
let gameOver = false;
let gameFinished = false;

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

      drawVisitedArtworks();

      drawInGrid(route.start, "🚩");
      drawInGrid(route.end, "🏁");

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

    drawLives();

    if (gameOver || gameFinished) {
      player.allowedToMove = false;
      hideAllModals();

      if (gameOver) {
        drawGameOver();
      }

      if (gameFinished) {
        stopCountdown();
        drawEnd();
      }
    }
  }
}

function mousePressed() {
  handleModalInput();
}

function touchStarted(event) {
  // If a modal is open, handle modal input and do not move player
  if (modalStack.length > 0) {
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
