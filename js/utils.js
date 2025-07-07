function positionToCell(position) {
  const rowId = Math.floor(position.y / cellSize);
  const colId = Math.floor(position.x / cellSize);
  return { x: colId, y: rowId };
}

function isPlayerAtEnd() {
  // Check the center of the player
  const cell = positionToCell({
    x: player.position.x + cellSize / 2,
    y: player.position.y + cellSize / 2,
  });

  return route.end && cell.x === route.end.x && cell.y === route.end.y;
}

function stayInTheWorld(position) {
  const worldWidth = cols * cellSize;
  const worldHeight = rows * cellSize;

  position.x = constrain(position.x, 0, worldWidth - cellSize);
  position.y = constrain(position.y, 0, worldHeight - cellSize);

  return position;
}

function isCollidingWithObstacle(destination) {
  // const { x, y } = destination;

  // Check if out of bounds
  // if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length) {
  //   return false; // Let constrain() handle bounds, don't block as collision
  // }

  // const content = grid[y][x];

  // if (content === 0) {
  //   return true;
  // }

  return false;
}

function updateCamera() {
  // Calculate target camera position to center player on screen
  const targetX = player.position.x + cellSize / 2 - width / 2;
  const targetY = player.position.y + cellSize / 2 - height / 2;

  // Camera movement with bounds checking
  const worldWidth = cols * cellSize;
  const worldHeight = rows * cellSize;

  camera.x = constrain(targetX, 0, Math.max(0, worldWidth - width));
  camera.y = constrain(targetY, 0, Math.max(0, worldHeight - height));
  translate(-camera.x, -camera.y);
}
