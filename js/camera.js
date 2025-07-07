const camera = {
  x: 0,
  y: 0,
};

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

function drawWithCamera(callback) {
  updateCamera();

  push();

  translate(-camera.x, -camera.y);
  callback();

  pop();
}
