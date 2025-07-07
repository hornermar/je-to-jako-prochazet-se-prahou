function calculateModalPosition(modalConfig, modalW, modalH, stackIndex = 0) {
  const stackOffset = stackIndex * MODAL_CONFIG.STACK_OFFSET;

  if (
    typeof modalConfig.position === "object" &&
    modalConfig.position.x &&
    modalConfig.position.y
  ) {
    return {
      x: modalConfig.position.x + stackOffset,
      y: modalConfig.position.y + stackOffset,
    };
  }

  switch (modalConfig.position) {
    case "top":
      return {
        x: (width - modalW) / 2 + stackOffset,
        y: MODAL_CONFIG.MARGIN.TOP + stackOffset,
      };
    case "bottom":
      return {
        x: (width - modalW) / 2 + stackOffset,
        y: height - modalH - MODAL_CONFIG.MARGIN.BOTTOM + stackOffset,
      };
    case "center":
    default:
      return {
        x: (width - modalW) / 2 + stackOffset,
        y: (height - modalH) / 2 + stackOffset,
      };
  }
}

function calculateButtonPositions(modalConfig, stackIndex) {
  const { width, height } = modalConfig.size;
  const position = calculateModalPosition(
    modalConfig,
    width,
    height,
    stackIndex
  );

  const totalButtonsWidth = getTotalButtonsWidth(modalConfig.buttons);
  const startX = position.x + (width - totalButtonsWidth) / 2;
  const buttonY = position.y + height - MODAL_CONFIG.MARGIN.BUTTON_BOTTOM;

  return {
    modalX: position.x,
    modalY: position.y,
    startX,
    buttonY,
  };
}

function getTotalButtonsWidth(buttons) {
  return (
    MODAL_CONFIG.BUTTON_WIDTH * buttons.length +
    MODAL_CONFIG.BUTTON_SPACING * (buttons.length - 1)
  );
}

function getWrappedTextLines(text, maxWidth) {
  const words = text ? text.split(" ") : [];
  const lines = [];
  let currentLine = "";

  for (let word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    textSize(MODAL_CONFIG.TEXT.TITLE_SIZE);
    const testWidth = textWidth(testLine);

    if (testWidth > maxWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
