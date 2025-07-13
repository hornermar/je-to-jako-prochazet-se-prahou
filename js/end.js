function drawGameOver() {
  push();
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(...COLORS.CONTRAST);
  text("GAME OVER", width / 2, height / 2);
  pop();
}

function drawEnd() {
  push();
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(...COLORS.CONTRAST);
  text("Congratulations!", width / 2, height / 2 - 50);
  textSize(20);
  text("You reached the end of the game!", width / 2, height / 2 + 50);
  pop();
}
