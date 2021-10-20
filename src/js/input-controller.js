"use strict";
class inputController {
  enabled;
  focused;
  ACTION_ACTIVATED;
  ACTION_DEACTIVATED;

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target;
    this.target.addEventListener("keydown", (e) => {
      // for(let i = 0; i<this.actions)
    });
  }

  bindActions(actionsToBind) {
    this.actionsToBind = actionsToBind;
  }

  enableAction(actionName) {}
  disableAction(actionName) {}

  isActionActive(action) {
    for (let i = 0; i < this.actionsToBind[action].keys.length; i++) {
      if (this.isKeyPressed(this.actionsToBind[action].keys[i])) {
        return true;
      }
    }
  }

  isKeyPressed(keyCode) {
    if (window.event.keyCode === keyCode) {
      return true;
    }
  }
}
