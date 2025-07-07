let modalStack = [];

function showModal(config) {
  if (!config.id) {
    config.id = "modal-" + Date.now();
  }

  if (config.layer === undefined) {
    config.layer = modalStack.length;
  }

  modalStack.push({
    ...config,
    size: {
      width: config.size?.width || 320,
      height: config.size?.height || 180,
    },
  });
  modalStack.sort((a, b) => a.layer - b.layer);
}

function hideModal(modalId = null) {
  if (modalId) {
    modalStack = modalStack.filter((modal) => modal.id !== modalId);
  } else {
    modalStack.pop();
  }
}

function hideAllModals() {
  modalStack = [];
}

function getModalStack() {
  return modalStack;
}

// Modal configuration structure:
// {
//   id: "unique-id", // optional, auto-generated if not provided
//   title: "Modal title",
//   description: "Optional description text",
//   buttons: [
//     {
//       label: "Button text",
//       isPrimary: true/false,
//       callback: function() { /* action */ },
//       closeModal: true/false // optional, default true - whether clicking this button closes the modal
//     }
//   ],
//   position: "center" | "top" | "bottom" | { x: number, y: number },
//   size: { width: number, height: number }, // optional, defaults to auto
//   layer: number // optional, higher numbers appear on top
// }
