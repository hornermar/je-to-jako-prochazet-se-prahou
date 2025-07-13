const countdown = {
  startTime: 0,
  isRunning: false,
  currentTime: 0,
  totalTime: 1 * 60 * 1000, // minutes in milliseconds
};

function startCountdown() {
  if (!countdown.isRunning && !countdown.startTime) {
    countdown.startTime = millis();
    countdown.isRunning = true;
  }
}

function updateCountdown() {
  if (countdown.isRunning) {
    const elapsed = millis() - countdown.startTime;
    countdown.currentTime = Math.max(0, countdown.totalTime - elapsed);

    if (countdown.currentTime <= 0) {
      stopCountdown();
      countdown.currentTime = 0;
      gameOver = true;
    }
  }
}

function stopCountdown() {
  if (countdown.isRunning) {
    countdown.isRunning = false;
  }
}

function formatTime() {
  const totalSeconds = Math.floor(countdown.currentTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function drawCountdown() {
  updateCountdown();

  push();
  fill(255, 255, 255, 200);
  noStroke();
  const countdownText = formatTime();
  textAlign(RIGHT, TOP);
  textSize(20);
  textStyle(NORMAL);

  const padding = 10;

  fill(0);
  text(countdownText, width - padding, padding);
  pop();
}
