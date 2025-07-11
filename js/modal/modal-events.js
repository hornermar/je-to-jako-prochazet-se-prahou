// Modal click handling and interaction
function checkModalClick(modalConfig, stackIndex) {
  if (!modalConfig.buttons || modalConfig.buttons.length === 0) return false;

  const { startX, buttonY } = calculateButtonPositions(modalConfig, stackIndex);

  for (let i = 0; i < modalConfig.buttons.length; i++) {
    const button = modalConfig.buttons[i];
    const buttonX =
      startX + i * (MODAL_CONFIG.BUTTON_WIDTH + MODAL_CONFIG.BUTTON_SPACING);

    if (
      mouseX > buttonX &&
      mouseX < buttonX + MODAL_CONFIG.BUTTON_WIDTH &&
      mouseY > buttonY &&
      mouseY < buttonY + MODAL_CONFIG.BUTTON_HEIGHT
    ) {
      if (button.callback) {
        button.callback();
      }

      // Only close modal if closeModal is not explicitly set to false
      if (button.closeModal !== false) {
        hideModal(modalConfig.id);
      }

      return true; // Click was handled
    }
  }

  return false; // No click handled
}

function handleModalInput() {
  const modalStack = getModalStack();
  if (modalStack.length === 0) return;

  // Check modals from top to bottom (reverse order)
  for (let stackIndex = modalStack.length - 1; stackIndex >= 0; stackIndex--) {
    const modalConfig = modalStack[stackIndex];

    if (checkModalClick(modalConfig, stackIndex)) {
      break; // Stop checking after first successful click
    }
  }
}

// Touch support for modal buttons
function handleModalTouchInput() {
  // Use the same logic as handleModalInput, but can be called from touchStarted/touchEnded
  handleModalInput();
}
