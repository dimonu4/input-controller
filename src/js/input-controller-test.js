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

let testBlock = document.querySelector(".test_block");
let left = 200;
let topCoordinate = 200;
testBlock.style.left = left + "px";
testBlock.style.top = topCoordinate + "px";

let controller = new inputController(actionsA, document);

let buttonAttach = document.querySelector(".btnAttach");
buttonAttach.addEventListener("click", () => {
  controller.attach(controller.target, !controller.keyboard.enabled);
});
let buttonDetach = document.querySelector(".btnDetach");
buttonDetach.addEventListener("click", () => {
  controller.detach();
});

let buttonActivate = document.querySelector(".btnActivate");
buttonActivate.addEventListener("click", () => {
  controller.enabled(true);
});
let buttonDeactivate = document.querySelector(".btnDeactivate");
buttonDeactivate.addEventListener("click", () => {
  controller.enabled(false);
});

let addJumpButton = document.querySelector(".btnAddJump");
addJumpButton.addEventListener("click", () => {
  controller.bindActions(actionsB);
});

window.addEventListener("left", () => {
  const startMove = setInterval(() => {
    left -= 5;
    testBlock.style.left = left + "px";
  }, 30);
  window.addEventListener("input-controller:action-deactivated", (e) => {
    clearInterval(startMove);
  });
});

window.addEventListener("right", () => {
  const startMove = setInterval(() => {
    left += 5;
    testBlock.style.left = left + "px";
  }, 30);
  window.addEventListener("input-controller:action-deactivated", (e) => {
    clearInterval(startMove);
  });
});

window.addEventListener("up", () => {
  const startMove = setInterval(() => {
    topCoordinate -= 5;
    testBlock.style.top = topCoordinate + "px";
  }, 30);
  window.addEventListener("input-controller:action-deactivated", (e) => {
    clearInterval(startMove);
  });
});

window.addEventListener("down", () => {
  const startMove = setInterval(() => {
    topCoordinate += 5;
    testBlock.style.top = topCoordinate + "px";
  }, 30);
  window.addEventListener("input-controller:action-deactivated", (e) => {
    clearInterval(startMove);
  });
});

window.addEventListener("jump", () => {
  if (testBlock.style.background === "red") {
    testBlock.style.background = "teal";
  } else {
    testBlock.style.background = "red";
  }
});
