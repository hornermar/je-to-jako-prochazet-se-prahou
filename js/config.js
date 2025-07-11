const COLORS = {
  GREEN: [49, 84, 78], // 49, 84, 78
  CITY: [205, 147, 169],
  CENTER: [160, 102, 127],
  WATER: [103, 36, 107],
  WHITE: [255, 255, 255],
  BLACK: [0, 0, 0],
  GRAY_DARK: [120, 120, 120],
  GRAY_LIGHT: [220, 220, 220],
  GRAY_MEDIUM: [140, 140, 140],
  GRAY_MEDIUM_LIGHT: [200, 200, 200],
  GRAY_MEDIUM_DARK: [120, 120, 120],
};

function lightenColor(color, amount = 4) {
  return color.map((c) => Math.min(255, c + amount));
}

function darkenColor(color, amount = 20) {
  return color.map((c) => Math.max(0, c - amount));
}

const MODAL_CONFIG = {
  BUTTON_WIDTH: 120,
  BUTTON_HEIGHT: 32,
  BUTTON_SPACING: 20,
  STACK_OFFSET: 20,
  MARGIN: {
    TOP: 50,
    BOTTOM: 50,
    BUTTON_BOTTOM: 45,
    CONTENT_HORIZONTAL: 40,
    CONTENT_TOP: 25,
  },
  TEXT: {
    TITLE_SIZE: 14,
    DESCRIPTION_SIZE: 12,
    BUTTON_SIZE: 11,
    LINE_HEIGHT: 18,
  },
  SHADOW_OFFSET: 6,
  BORDER_WIDTH: 3,
  ACCENT_HEIGHT: 4,
};
