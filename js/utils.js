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

function stayInWorld(position) {
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

function drawVisitedArtworks() {
  const cornerRadius = GRID_CONFIG.CORNER_RADIUS(cellSize);
  const alpha = 150;

  for (let artworkId of player.artworksVisited) {
    const artwork = artworks.find((a) => a.id === artworkId);

    const artworkX = artwork.position.x;
    const artworkY = artwork.position.y;
    const visibility = artwork.visibility || 0;

    if (visibility > 0) {
      const areaX = (artworkX - visibility) * cellSize;
      const areaY = (artworkY - visibility) * cellSize;
      const areaW = (2 * visibility + 1) * cellSize;
      const areaH = (2 * visibility + 1) * cellSize;
      push();
      fill(...COLORS.GRAY_MEDIUM, alpha);
      rect(areaX, areaY, areaW, areaH, cornerRadius);
      pop();
    } else {
      push();
      fill(...COLORS.GRAY_MEDIUM, alpha);
      rect(
        artworkX * cellSize,
        artworkY * cellSize,
        cellSize,
        cellSize,
        cornerRadius
      );
      pop();
    }

    // drawInGrid({ x: artworkX, y: artworkY }, "◾");
  }
}
