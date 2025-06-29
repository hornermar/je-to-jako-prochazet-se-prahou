const player1 = {
  x: 0,
  y: 0,
  isMoving: false,
  isAlive: true,
  direction: "right", // default direction of the emoji
};

function initializePlayer(gridX, gridY) {
  player1.x = gridX * cellSize;
  player1.y = gridY * cellSize;
}

/**
 * This function is called 60 times/second
 * It should move player based on user input
 * But only if there's no collision
 */
function movePlayer() {
  let isMoving = false;
  const speed = Math.floor(deltaTime * 0.08);

  let deltaX = 0;
  let deltaY = 0;

  if (keyIsDown(RIGHT_ARROW)) {
    deltaX = 1;
    isMoving = true;
    player1.direction = "right";
  } else if (keyIsDown(LEFT_ARROW)) {
    deltaX = -1;
    isMoving = true;
    player1.direction = "left";
  }

  if (keyIsDown(UP_ARROW)) {
    deltaY = -1;
    isMoving = true;
  } else if (keyIsDown(DOWN_ARROW)) {
    deltaY = 1;
    isMoving = true;
  }

  player1.isMoving = isMoving;
  player1.x += deltaX * speed;
  player1.y += deltaY * speed;

  if (
    player1.x < 0 ||
    player1.x > width ||
    player1.y < 0 ||
    player1.y > height
  ) {
    player1.isAlive = false;
  }
}

function drawPlayer() {
  if (player1.isMoving && player1.isAlive) {
    // damping = Math.abs(Math.sin(millis() / 50)) * 3; // 0 - 3
  }
  textSize(cellSize);

  if (player1.isAlive) {
    push(); // Save current transformation state

    // Move to player position for transformations
    translate(player1.x + cellSize / 2, player1.y + offsetY + cellSize / 2);

    // Apply transformations only for left/right
    if (player1.direction === "right") {
      scale(-1, 1); // Flip horizontally for left direction
    }
    // Right direction uses default (no transformation)

    textAlign(CENTER, CENTER);
    text("🚶‍♀️", 0, 0);

    pop();
  } else {
    text("💀", player1.x, player1.y + offsetY);
  }
}
