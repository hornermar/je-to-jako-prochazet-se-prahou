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
      } else if (cell === 1 || cell === 2) {
        fill(...COLORS.CITY);
        drawRoundedCity(ix, iy);
      } else if (cell === 3 || cell === 4) {
        fill(...COLORS.WATER);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);

        if (cell === 4) {
          drawInGrid({ x: ix, y: iy }, "🌉", cellSize * 0.7);
        }
      }

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

function drawRoundedCity(x, y) {
  const topCell = getCell(x, y - 1);
  const rightCell = getCell(x + 1, y);
  const bottomCell = getCell(x, y + 1);
  const leftCell = getCell(x - 1, y);

  const cornerRadius = cellSize * 0.7;

  const shouldRoundTL = topCell === 0 && leftCell === 0;
  const shouldRoundTR = topCell === 0 && rightCell === 0;
  const shouldRoundBR = bottomCell === 0 && rightCell === 0;
  const shouldRoundBL = bottomCell === 0 && leftCell === 0;

  const tlRadius = shouldRoundTL ? cornerRadius : 0;
  const trRadius = shouldRoundTR ? cornerRadius : 0;
  const brRadius = shouldRoundBR ? cornerRadius : 0;
  const blRadius = shouldRoundBL ? cornerRadius : 0;

  rect(
    x * cellSize,
    y * cellSize,
    cellSize,
    cellSize,
    tlRadius,
    trRadius,
    brRadius,
    blRadius
  );
}

function drawGreyRect(ix, iy) {
  push();
  translate(ix * cellSize + cellSize / 2, iy * cellSize + cellSize / 2);

  const colors = [
    COLORS.BLACK,
    COLORS.WHITE,
    COLORS.GRAY_DARK,
    COLORS.GRAY_LIGHT,
    COLORS.GRAY_MEDIUM,
    COLORS.GRAY_MEDIUM_LIGHT,
    COLORS.GRAY_MEDIUM_DARK,
  ];

  const colorType = (ix * 2 + iy) % colors.length;
  const size = cellSize * 0.15;

  fill(...colors[colorType]);
  noStroke();

  rect(-size / 2, -size / 2, size, size);

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
