const rows = grid.length;
const cols = grid[0].length;

// Calculate cell size to fill window height
const calculatedCellSize = Math.floor(window.innerHeight / rows);
const minCellSize = 17;
const cellSize =
  calculatedCellSize < minCellSize ? minCellSize : calculatedCellSize;

const camera = {
  x: 0,
  y: 0,
};

const route = {
  start: { x: 27, y: 20 },
  end: { x: 40, y: 16 },
};

function setup() {
  frameRate(30);
  createCanvas(window.innerWidth, window.innerHeight);

  initializePlayer(route.start.x, route.start.y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateCamera() {
  // Calculate target camera position to center player on screen
  const targetX = player.position.x + cellSize / 2 - width / 2;
  const targetY = player.position.y + cellSize / 2 - height / 2;

  // Direct camera movement with bounds checking
  const worldWidth = cols * cellSize;
  const worldHeight = rows * cellSize;

  camera.x = constrain(targetX, 0, Math.max(0, worldWidth - width));
  camera.y = constrain(targetY, 0, Math.max(0, worldHeight - height));
}

function draw() {
  startCountdown();

  updateCountdown();
  updateCamera();

  // Apply camera transformation for world objects
  push();
  translate(-camera.x, -camera.y);

  drawGrid();

  // Handle user input and draw player
  movePlayer();
  drawPlayer();

  pop();

  // Draw UI elements outside of camera transformation
  drawCountdown();
}
