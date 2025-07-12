let lastVisibleVisitedCells = {};

function drawInGrid(cell, emoji, size = cellSize * 0.8, isFlipped = false) {
  push();

  const centerX = cell.x * cellSize + cellSize / 2;
  const centerY = cell.y * cellSize + cellSize / 2;
  translate(centerX, centerY);

  if (isFlipped) {
    scale(-1, 1);
  }

  textAlign(CENTER, CENTER);
  textSize(size);
  text(emoji, 0, 0);

  pop();
}

function drawGrid() {
  background(COLORS.GRAY_LIGHT);
  // Draw Prague map
  noStroke();

  for (let iy = 0; iy < grid.length; iy++) {
    for (let ix = 0; ix < grid[iy].length; ix++) {
      const cell = grid[iy][ix];

      if (cell === 0) {
        fill(...COLORS.GRAY_LIGHT);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 1) {
        fill(...COLORS.CITY);
        drawRoundedCell(ix, iy, cell);
      } else if (cell === 2) {
        fill(...COLORS.CITY);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);

        fill(...COLORS.CENTER);
        drawRoundedCell(ix, iy, cell);
      } else if (cell === 3 || cell === 4) {
        // TODO: Handle better
        if (iy > 16 && iy < 26) {
          fill(...COLORS.CENTER);
        } else {
          fill(...COLORS.CITY);
        }
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);

        fill(...COLORS.WATER);
        drawRoundedCell(ix, iy, cell);
        if (cell === 4) {
          drawInGrid({ x: ix, y: iy }, "🌉", cellSize * 0.7);
        }
      }

      // drawGlitter(ix, iy);
    }
  }

  // Draw visited artwork blotches OVER the grid
  for (let iy = 0; iy < grid.length; iy++) {
    for (let ix = 0; ix < grid[iy].length; ix++) {
      drawGlitter(ix, iy);
    }
  }

  // For now display artworks
  // for (let artwork of artworks) {
  //   const artworkX = artwork.position.x;
  //   const artworkY = artwork.position.y;
  //   const visibility = artwork.visibility || 0;

  //   // Draw artwork emoji in all cells within visibility range
  //   for (let dx = -visibility; dx <= visibility; dx++) {
  //     for (let dy = -visibility; dy <= visibility; dy++) {
  //       const cellX = artworkX + dx;
  //       const cellY = artworkY + dy;

  //       // Check if the cell is within bounds
  //       if (
  //         cellX >= 0 &&
  //         cellX < grid[0].length &&
  //         cellY >= 0 &&
  //         cellY < grid.length
  //       ) {
  //         drawInGrid({ x: cellX, y: cellY }, "◽");
  //       }

  //       if (dx === 0 && dy === 0) {
  //         // Draw the main artwork emoji at its position
  //         drawInGrid({ x: artworkX, y: artworkY }, "◾");
  //       }
  //     }
  //   }
  // }

  drawInGrid(route.start, "🚩");
  drawInGrid(route.end, "🏁");
}

const getRadius = (shouldRound, radius) => (shouldRound ? radius : 0);
const isCity = (v) => v === 1 || v === 2;
const isNeighborWith = (cellType, firstCell, secondCell) =>
  firstCell === cellType && secondCell === cellType;

function drawRoundedCell(x, y, cellType) {
  const cornerRadius = cellSize * 0.7;

  const topCell = getCell(x, y - 1);
  const rightCell = getCell(x + 1, y);
  const bottomCell = getCell(x, y + 1);
  const leftCell = getCell(x - 1, y);

  let shouldRoundTL = false,
    shouldRoundTR = false,
    shouldRoundBR = false,
    shouldRoundBL = false;

  if (cellType === 1) {
    shouldRoundTL = isNeighborWith(0, topCell, leftCell);
    shouldRoundTR = isNeighborWith(0, topCell, rightCell);
    shouldRoundBR = isNeighborWith(0, bottomCell, rightCell);
    shouldRoundBL = isNeighborWith(0, bottomCell, leftCell);
  } else if (cellType === 2) {
    shouldRoundTL = isNeighborWith(1, topCell, leftCell);
    shouldRoundTR = isNeighborWith(1, topCell, rightCell);
    shouldRoundBR = isNeighborWith(1, bottomCell, rightCell);
    shouldRoundBL = isNeighborWith(1, bottomCell, leftCell);
  } else if (cellType === 3 || cellType === 4) {
    shouldRoundTL = isCity(topCell) && isCity(leftCell);
    shouldRoundTR = isCity(topCell) && isCity(rightCell);
    shouldRoundBR = isCity(bottomCell) && isCity(rightCell);
    shouldRoundBL = isCity(bottomCell) && isCity(leftCell);
  }

  rect(
    x * cellSize,
    y * cellSize,
    cellSize,
    cellSize,
    getRadius(shouldRoundTL, cornerRadius),
    getRadius(shouldRoundTR, cornerRadius),
    getRadius(shouldRoundBR, cornerRadius),
    getRadius(shouldRoundBL, cornerRadius)
  );
}

function drawGreyRect(ix, iy) {
  push();
  translate(ix * cellSize + cellSize / 2, iy * cellSize + cellSize / 2);

  const colors = [
    COLORS.BLACK,
    COLORS.GRAY_DARK,
    COLORS.GRAY_MEDIUM,
    COLORS.GRAY_MEDIUM_LIGHT,
    COLORS.GRAY_MEDIUM_DARK,
  ];

  // Deterministic random seed per cell for consistent layout
  randomSeed(ix * 10007 + iy * 10009);
  const rectCount = floor(random(1, 4));
  // All rectangles in this cell have the same size
  const size = cellSize * 0.12;

  for (let i = 0; i < rectCount; i++) {
    const colorType = floor(random(colors.length));
    fill(...colors[colorType]);
    noStroke();
    // Position: center +/- up to 60% of cell, can go a bit outside
    const x = random(-cellSize * 0.6, cellSize * 0.6);
    const y = random(-cellSize * 0.6, cellSize * 0.6);
    push();
    translate(x, y);
    // No rotation
    rect(-size / 2, -size / 2, size, size, size * 0.2);
    pop();
  }

  pop();
}

function drawGlitter(ix, iy) {
  const cellKey = `${ix}-${iy}`;

  if (player.visitedCells && player.visitedCells[cellKey]) {
    if (player.isMoving) {
      const randomSeed = (ix * 17 + iy * 23 + frameCount) % 100;
      const isVisible = randomSeed < 40;
      lastVisibleVisitedCells[cellKey] = isVisible;
      if (isVisible) {
        drawGreyRect(ix, iy);
      }
    } else {
      if (lastVisibleVisitedCells[cellKey]) {
        drawGreyRect(ix, iy);
      }
    }
  }
}
