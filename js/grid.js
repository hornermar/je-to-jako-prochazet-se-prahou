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
  background(COLORS.GREEN);
  // Draw Prague map
  noStroke();

  for (let iy = 0; iy < grid.length; iy++) {
    for (let ix = 0; ix < grid[iy].length; ix++) {
      const cell = grid[iy][ix];

      if (cell === 0) {
        fill(...COLORS.GREEN);
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
    }
  }
}

const getRadius = (shouldRound, radius) => (shouldRound ? radius : 0);
const isCity = (v) => v === 1 || v === 2;
const isNeighborWith = (cellType, firstCell, secondCell) =>
  firstCell === cellType && secondCell === cellType;

function drawRoundedCell(x, y, cellType) {
  const cornerRadius = GRID_CONFIG.CORNER_RADIUS(cellSize);

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
