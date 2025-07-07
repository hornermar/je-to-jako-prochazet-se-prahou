const COLORS = {
  GREEN: [213, 230, 211],
  CITY: [247, 239, 223],
  CENTER: [245, 223, 176],
  WATER: [131, 200, 222],
  WHITE: [255, 255, 255],
  BLACK: [0, 0, 0],
  DARK_GRAY: [120, 120, 120],
  LIGHT_GRAY: [120, 120, 120],
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
