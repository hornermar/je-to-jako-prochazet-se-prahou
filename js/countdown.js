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

    // Stop countdown when it reaches zero
    if (countdown.currentTime <= 0) {
      countdown.isRunning = false;
      countdown.currentTime = 0;
    }
  }
}

function stopCountdown() {
  if (countdown.isRunning) {
    countdown.isRunning = false;
  }
}

function isTimeUp() {
  return countdown.currentTime <= 0 && countdown.startTime > 0;
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
  textSize(16);
  textStyle(NORMAL);

  // Background rectangle
  const textW = textWidth(countdownText);
  const padding = 10;
  rect(width - textW - padding * 2, 0, textW + padding * 2, 35);

  fill(0);
  text(countdownText, width - padding, padding);
  pop();
}
