const totalLives = 5;

function drawLives() {
  const lives = Math.max(0, totalLives - player.artworksVisited.length);

  if (lives <= 0) {
    gameOver = true;
  }

  push();
  textAlign(LEFT, TOP);
  textSize(cellSize * 0.8);
  fill(0);

  const x = 10;
  const y = 10;

  text("🖤".repeat(Math.max(0, lives)), x, y);
  pop();
}
