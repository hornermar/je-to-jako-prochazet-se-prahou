// Grid dimensions based on pragueMap
const rows = pragueMap.length;
const cols = pragueMap[0].length;

// Calculate cell size to fill window height
const calculatedCellSize = Math.floor(window.innerHeight / rows);
const cellSize = calculatedCellSize < 20 ? 20 : calculatedCellSize;

const offsetY = Math.floor(cellSize * 1.05); // Y offset for emojis

function setup() {
  frameRate(30);
  createCanvas(cols * cellSize, rows * cellSize);

  initializePlayer(18, 14);

  // p5 is going to call draw() repeatedly now
}

function draw() {
  background(220);

  // Draw grid
  fill(61, 84, 62);
  textSize(cellSize);

  // Draw Prague map
  stroke(255); // White stroke/border
  strokeWeight(1); // Thin border
  for (let iy = 0; iy < pragueMap.length; iy++) {
    for (let ix = 0; ix < pragueMap[iy].length; ix++) {
      const cell = pragueMap[iy][ix];
      if (cell === 0) {
        fill(216, 239, 223);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 1) {
        fill(254, 248, 231);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 2) {
        fill(254, 243, 211);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 3) {
        fill(175, 204, 250);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      } else if (cell === 5) {
        fill(120, 120, 120);
        rect(ix * cellSize, iy * cellSize, cellSize, cellSize);
      }
    }
  }

  // For now display artworks
  for (let artwork of artworks) {
    const position = artwork.position;

    textAlign(CENTER, CENTER);
    textSize(cellSize);
    text(
      "◾",
      position.x * cellSize + cellSize / 2,
      position.y * cellSize + offsetY + cellSize / 2
    );
  }

  // Handle user input and draw player
  movePlayer();
  drawPlayer();
}
