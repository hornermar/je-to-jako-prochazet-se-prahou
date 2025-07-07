function drawModal() {
  const modalStack = getModalStack();
  if (modalStack.length === 0) return;

  for (let i = 0; i < modalStack.length; i++) {
    const modal = modalStack[i];
    drawSingleModal(modal, i);
  }
}

function drawSingleModal(modalConfig, stackIndex) {
  const modalW = modalConfig.size?.width || 320;
  const modalH = modalConfig.size?.height || 180;

  const position = calculateModalPosition(
    modalConfig,
    modalW,
    modalH,
    stackIndex
  );
  const modalX = position.x;
  const modalY = position.y;

  drawModalBackground(modalX, modalY, modalW, modalH);
  drawModalContent(modalX, modalY, modalW, modalH, modalConfig);
  drawModalButtons(modalConfig);
}

function drawModalBackground(modalX, modalY, modalW, modalH) {
  // Shadow
  fill(COLORS.DARK_GRAY);
  noStroke();
  rect(
    modalX + MODAL_CONFIG.SHADOW_OFFSET,
    modalY + MODAL_CONFIG.SHADOW_OFFSET,
    modalW,
    modalH
  );

  // Background
  fill(COLORS.WHITE);
  noStroke();
  rect(modalX, modalY, modalW, modalH);

  // Border
  const borderWidth = MODAL_CONFIG.BORDER_WIDTH;
  fill(COLORS.BLACK);
  rect(
    modalX - borderWidth,
    modalY - borderWidth,
    modalW + borderWidth * 2,
    borderWidth
  ); // top
  rect(
    modalX - borderWidth,
    modalY + modalH,
    modalW + borderWidth * 2,
    borderWidth
  ); // bottom
  rect(
    modalX - borderWidth,
    modalY - borderWidth,
    borderWidth,
    modalH + borderWidth * 2
  ); // left
  rect(
    modalX + modalW,
    modalY - borderWidth,
    borderWidth,
    modalH + borderWidth * 2
  ); // right

  // Accent border
  fill(COLORS.WATER);
  rect(modalX, modalY, modalW, MODAL_CONFIG.ACCENT_HEIGHT);
}

function drawModalContent(modalX, modalY, modalW, _modalH, modalConfig) {
  textAlign(CENTER, CENTER);
  textSize(MODAL_CONFIG.TEXT.TITLE_SIZE);
  textStyle(NORMAL);
  fill(COLORS.BLACK);

  const maxWidth = modalW - MODAL_CONFIG.MARGIN.CONTENT_HORIZONTAL;
  let currentY = modalY + MODAL_CONFIG.MARGIN.CONTENT_TOP;

  // Draw title
  const titleLines = getWrappedTextLines(modalConfig.title, maxWidth);
  const lineHeight = MODAL_CONFIG.TEXT.LINE_HEIGHT;

  for (let i = 0; i < titleLines.length; i++) {
    text(titleLines[i], modalX + modalW / 2, currentY + i * lineHeight);
  }
  currentY += titleLines.length * lineHeight + 10;

  // Draw description if provided
  if (modalConfig.description) {
    textSize(MODAL_CONFIG.TEXT.DESCRIPTION_SIZE);
    fill(COLORS.DARK_GRAY);
    const descLines = getWrappedTextLines(modalConfig.description, maxWidth);

    for (let i = 0; i < descLines.length; i++) {
      text(descLines[i], modalX + modalW / 2, currentY + i * lineHeight);
    }
  }
}

function drawModalButtons(modalConfig) {
  if (!modalConfig.buttons || modalConfig.buttons.length === 0) return;

  // Calculate stack index from modal position
  const modalStack = getModalStack();
  const stackIndex = modalStack.findIndex((m) => m.id === modalConfig.id);
  const { startX, buttonY } = calculateButtonPositions(modalConfig, stackIndex);

  for (let i = 0; i < modalConfig.buttons.length; i++) {
    const button = modalConfig.buttons[i];
    const buttonX =
      startX + i * (MODAL_CONFIG.BUTTON_WIDTH + MODAL_CONFIG.BUTTON_SPACING);

    const buttonData = {
      label: button.label,
      x: buttonX,
      y: buttonY,
      w: MODAL_CONFIG.BUTTON_WIDTH,
      h: MODAL_CONFIG.BUTTON_HEIGHT,
      callback: button.callback,
      modalId: modalConfig.id,
    };

    drawButton(buttonData, button.isPrimary);
  }
}

function drawButton(btn, isPrimary = false) {
  const backgroundColor = isPrimary ? COLORS.WATER : COLORS.WHITE;

  const isHover =
    mouseX > btn.x &&
    mouseX < btn.x + btn.w &&
    mouseY > btn.y &&
    mouseY < btn.y + btn.h;

  if (isPrimary) {
    fill(isHover ? COLORS.WATER : lightenColor(COLORS.WATER), 20);
  } else {
    fill(COLORS.WHITE);
  }

  noStroke();
  rect(btn.x, btn.y, btn.w, btn.h);

  // Button border
  fill(darkenColor(backgroundColor), 150);
  rect(btn.x, btn.y, btn.w, 2); // top
  rect(btn.x, btn.y + btn.h - 2, btn.w, 2); // bottom
  rect(btn.x, btn.y, 2, btn.h); // left
  rect(btn.x + btn.w - 2, btn.y, 2, btn.h); // right

  // Bottom shadow
  fill(COLORS.LIGHT_GRAY);
  rect(btn.x, btn.y + btn.h - 1, btn.w, 1);

  // Button text
  if (isPrimary) {
    fill(...COLORS.WHITE);
  } else {
    fill(COLORS.DARK_GRAY);
  }

  textAlign(CENTER, CENTER);
  textSize(MODAL_CONFIG.TEXT.BUTTON_SIZE);
  textStyle(BOLD);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}
