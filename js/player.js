const player = {
  position: { x: 0, y: 0 },
  isMoving: false,
  direction: "right",
  visitedCells: {},
  allowedToMove: true,
};

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let mobileMovement = { x: 0, y: 0 };
let isTouching = false;
const minSwipeDistance = 20; // Minimum distance for a swipe to register

function initializePlayer(gridX, gridY) {
  player.position.x = gridX * cellSize;
  player.position.y = gridY * cellSize;
}

function movePlayer() {
  if (!player.allowedToMove) return;

  let isMoving = false;

  // Get current player grid position
  const currentGridPos = positionToCell({
    x: player.position.x + cellSize / 2,
    y: player.position.y + cellSize / 2,
  });

  const currentContent =
    grid[currentGridPos.y] && grid[currentGridPos.y][currentGridPos.x];

  const isOutOfCity = currentContent === 0;

  const baseSpeed = Math.max(2, Math.floor(cellSize * 0.1));
  const speed = isOutOfCity ? baseSpeed * 0.1 : baseSpeed;

  let deltaX = 0;
  let deltaY = 0;

  // Desktop keyboard controls
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

  // Mobile touch controls
  if (isTouching && isMobileDevice()) {
    // Get current touch position
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate relative position from center
    const touchDeltaX = mouseX - centerX;
    const touchDeltaY = mouseY - centerY;

    // Determine movement direction based on which quadrant is being touched
    if (Math.abs(touchDeltaX) > Math.abs(touchDeltaY)) {
      // Horizontal movement
      deltaX = touchDeltaX > 0 ? 1 : -1;
      deltaY = 0;
      player.direction = touchDeltaX > 0 ? "right" : "left";
    } else {
      // Vertical movement
      deltaX = 0;
      deltaY = touchDeltaY > 0 ? 1 : -1;
    }

    isMoving = true;
  }

  // Legacy mobile movement for single taps (kept for compatibility)
  if (mobileMovement.x !== 0 || mobileMovement.y !== 0) {
    deltaX = mobileMovement.x;
    deltaY = mobileMovement.y;
    isMoving = true;

    if (mobileMovement.x > 0) {
      player.direction = "right";
    } else if (mobileMovement.x < 0) {
      player.direction = "left";
    }

    // Reset mobile movement after applying
    mobileMovement.x = 0;
    mobileMovement.y = 0;
  }

  const { position } = player;
  const newX = position.x + deltaX * speed;
  const newY = position.y + deltaY * speed;

  // Check collision at the center of the player's new position
  const newPosition = positionToCell({
    x: newX + cellSize / 2,
    y: newY + cellSize / 2,
  });

  const artwork = isCollidingWithArtwork(newPosition);

  if (isCollidingWithObstacle(newPosition)) {
    return;
  }

  if (artwork) {
    const cellKey = `${newPosition.x}-${newPosition.y}`;

    if (!player.visitedCells[cellKey]) {
      player.visitedCells[cellKey] = true;

      if (
        artwork.position.x === newPosition.x &&
        artwork.position.y === newPosition.y
      ) {
        onArtworkVisited();
      }

      drawArtworkModal(newPosition, artwork);
    }
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
    undefined,
    isFlipped
  );
}

// Touch event handlers for mobile controls
function touchEnded(event) {
  // Only enable touch controls on mobile devices and only if touch is on the canvas
  if (!isMobileDevice()) return;
  if (event && event.target && event.target.tagName !== "CANVAS") return;

  isTouching = false;
  touchEndX = mouseX;
  touchEndY = mouseY;
}

// Helper function to detect mobile devices
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || "ontouchstart" in window
  );
}
