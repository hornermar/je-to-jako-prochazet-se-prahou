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

function isCollidingWithArtwork(destination) {
  const { x, y } = destination;

  for (let artwork of artworks) {
    const artworkX = artwork.position.x;
    const artworkY = artwork.position.y;
    const visibility = artwork.visibility || 0;

    // Check if destination is within the visibility range of the artwork
    const deltaX = Math.abs(x - artworkX);
    const deltaY = Math.abs(y - artworkY);

    // Check if within the square area defined by visibility
    if (deltaX <= visibility && deltaY <= visibility) {
      return artwork;
    }
  }

  return false;
}

function isCollidingWithObstacle(destination) {
  const { x, y } = destination;

  const content = grid[y][x];

  if (content === 3) {
    return true;
  }

  return false;
}

function getCell(cx, cy) {
  return cy >= 0 && cy < grid.length && cx >= 0 && cx < grid[cy].length
    ? grid[cy][cx]
    : null;
}

function centerMapOnArtwork(artwork) {
  if (!artwork || !artwork.position) return;

  const { x, y } = artwork.position;
  player.position.x = x * cellSize;
  player.position.y = y * cellSize;
}

function onArtworkVisited() {
  artworksVisited++;
  lives -= 1;
  if (lives <= 0) {
    gameOver = true;
  }
}
