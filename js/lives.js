function drawLives() {
  push();
  textAlign(LEFT, TOP);
  textSize(28);
  fill(0);

  const x = 130; // TODO: responsive
  const y = 10;

  text("❤️".repeat(Math.max(0, lives)), x, y);
  pop();
}
