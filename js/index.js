// Universal constants and variables
const rows = grid.length;
const cols = grid[0].length;

const calculatedCellSize = Math.floor(window.innerHeight / rows);
const minCellSize = 17;
const cellSize =
  calculatedCellSize < minCellSize ? minCellSize : calculatedCellSize;

const route = {
  start: { x: 27, y: 20 },
  end: { x: 40, y: 16 },
};

let gameStarted = false;

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

  // Show welcome modal
  showWelcomeModal();
}

function showWelcomeModal() {
  showModal({
    id: "welcome",
    title: "Welcome to Prague Walking Game!",
    description:
      "Use arrow keys to move through the city. Reach the finish flag 🏁 within 30 minutes. Moving through water and obstacles will slow you down. Good luck!",
    buttons: [
      {
        label: "Cancel",
        isPrimary: false,
        callback: function () {
          gameStarted = true;
        },
      },
      {
        label: "Start Game",
        isPrimary: true,
        callback: function () {
          gameStarted = true;
        },
      },
      {
        label: "Show Help",
        isPrimary: false,
        closeModal: false, // Don't close the welcome modal when clicking this
        callback: function () {
          showHelpModal();
        },
      },
    ],
    position: "center",
    layer: 0,
  });
}

function showHelpModal() {
  showModal({
    id: "help",
    title: "How to Play",
    description:
      "🚶‍♀️ Use arrow keys to move\n🏁 Reach the finish flag\n⏰ Complete within 30 minutes\n💧 Water slows you down",
    buttons: [
      {
        label: "Got it!",
        isPrimary: true,
        callback: function () {
          // This will close just the help modal
        },
      },
    ],
    position: "top",
    layer: 1,
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  drawWithCamera(() => {
    drawGrid();
    if (gameStarted) {
      movePlayer();
    }
    drawPlayer();
  });

  // Draw modal if it's shown
  drawModal(); // Always call drawModal, it handles the check internally

  // UI elements outside of camera transformation
  if (gameStarted) {
    startCountdown();
    drawCountdown();
  }
}

function mousePressed() {
  handleModalInput();
}
