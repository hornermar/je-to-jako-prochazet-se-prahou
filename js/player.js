const player = {
  position: { x: 0, y: 0 },
  isMoving: false,
  direction: "right",
};

function initializePlayer(gridX, gridY) {
  player.position.x = gridX * cellSize;
  player.position.y = gridY * cellSize;
}

function movePlayer() {
  let isMoving = false;

  // Get current player grid position
  const currentGridPos = positionToCell({
    x: player.position.x + cellSize / 2,
    y: player.position.y + cellSize / 2,
  });

  const currentContent =
    grid[currentGridPos.y] && grid[currentGridPos.y][currentGridPos.x];

  const isOutOfCity = currentContent === 0 || currentContent === 3;

  const baseSpeed = Math.max(2, Math.floor(cellSize * 0.3));
  const speed = isOutOfCity ? baseSpeed * 0.3 : baseSpeed;

  let deltaX = 0;
  let deltaY = 0;

  if (keyIsDown(RIGHT_ARROW)) {
    deltaX = 1;
    isMoving = true;
    player.direction = "right";
  } else if (keyIsDown(LEFT_ARROW)) {
    deltaX = -1;
    isMoving = true;
    player.direction = "left";
  }

  if (keyIsDown(UP_ARROW)) {
    deltaY = -1;
    isMoving = true;
  } else if (keyIsDown(DOWN_ARROW)) {
    deltaY = 1;
    isMoving = true;
  }

  const { position } = player;
  const newX = position.x + deltaX * speed;
  const newY = position.y + deltaY * speed;

  // Check collision at the center of the player's new position
  const newPosition = positionToCell({
    x: newX + cellSize / 2,
    y: newY + cellSize / 2,
  });

  if (isCollidingWithObstacle(newPosition)) {
    console.log("Collision detected, player cannot move");
    return;
  }

  player.isMoving = isMoving;
  player.position = stayInTheWorld({ x: newX, y: newY });

  if (isPlayerAtEnd()) {
    console.log("🎉 Congratulations! You reached the end!");
    stopCountdown();
  }
}

function drawPlayer() {
  const { position } = player;

  const isFlipped = player.direction === "right" ? true : false;

  drawInGrid(
    { x: position.x / cellSize, y: position.y / cellSize },
    "🚶‍♀️",
    isFlipped
  );
}
