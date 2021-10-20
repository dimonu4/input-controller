"use strict";

const actionsA = {
  left: { keys: [37, 65], enabled: false },
  right: { keys: [39, 68], enabled: false },
  up: { keys: [38, 87], enabled: false },
  down: { keys: [40, 83], enabled: false },
};

const actionsB = {
  left: { keys: [37, 65], enabled: false },
  right: { keys: [39, 68], enabled: false },
  up: { keys: [38, 87], enabled: false },
  down: { keys: [40, 83], enabled: false },
  jump: { keys: [32], enabled: false },
};

// let testBlock = document.querySelector(".test");
let testBlock = document.body;

let controller = new inputController(actionsA, testBlock);

// window.addEventListener("keydown", (e) => {
//   controller.enableAction();

// if (controller.isActionActive("left")) {
//   console.log("move left");
// }
// if (controller.isActionActive("right")) {
//   console.log("move right");
// }
// if (controller.isActionActive("up")) {
//   console.log("move up");
// }
// if (controller.isActionActive("down")) {
//   console.log("move down");
// }
// if (controller.isActionActive("jump")) {
//   console.log("jump");
// }
// });

// controller.bindActions(actionsB);
