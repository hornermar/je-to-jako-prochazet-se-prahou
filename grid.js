const COLORS = {
  GREEN: [216, 239, 223],
  CITY: [254, 248, 231],
  CENTER: [254, 243, 211],
  WATER: [175, 204, 250],
  WHITE: [255, 255, 255],
};

function lightenColor(color, amount = 4) {
  return color.map((c) => Math.min(255, c + amount));
}

function drawInGrid(cell, emoji, isFlipped = false) {
  push();

  const centerX = cell.x * cellSize + cellSize / 2;
  const centerY = cell.y * cellSize + cellSize / 2;
  translate(centerX, centerY);

  if (isFlipped) {
    scale(-1, 1);
  }

  textAlign(CENTER, CENTER);
  textSize(cellSize * 0.8);
  text(emoji, 0, 0);

  pop();
}

function drawGrid() {
  // Draw Prague map
  noStroke();
  for (let iy = 0; iy < grid.length; iy++) {
    for (let ix = 0; ix < grid[iy].length; ix++) {
      const cell = grid[iy][ix];

      // Apply chessboard effect: alternate based on both row and column
      const isCheckerboardLight = (iy + ix) % 2 === 1;

      if (cell === 0) {
        const color = isCheckerboardLight
          ? lightenColor(COLORS.GREEN)
          : COLORS.GREEN;
        fill(...color);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 1) {
        const color = isCheckerboardLight
          ? lightenColor(COLORS.CITY)
          : COLORS.CITY;
        fill(...color);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 2) {
        const color = isCheckerboardLight
          ? lightenColor(COLORS.CENTER)
          : COLORS.CENTER;
        fill(...color);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 3) {
        const color = isCheckerboardLight
          ? lightenColor(COLORS.WATER)
          : COLORS.WATER;
        fill(...color);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      }
    }
  }

  // For now display artworks
  for (let artwork of artworks) {
    const position = artwork.position;

    drawInGrid(position, "◾");
  }

  drawInGrid(route.start, "🚩");
  drawInGrid(route.end, "🏁");
}
