"use strict";
class inputController {
  enabled;
  focused;
  ACTION_ACTIVATED = "input-controller:action-activated";
  ACTION_DEACTIVATED = "input-controller:action-deactivated";

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target;

    const testArea = this.target.querySelector(".test");
    testArea.addEventListener("focus", () => {
      this.focused = true;
    });
    testArea.addEventListener("blur", () => {
      this.focused = false;
    });

    let buttonAttach = this.target.querySelector(".btnAttach");
    buttonAttach.addEventListener("click", () => {
      this.attach(this.target, !this.enabled);
    });
    let buttonDetach = this.target.querySelector(".btnDetach");
    buttonDetach.addEventListener("click", () => {
      this.detach();
    });

    let buttonActivate = this.target.querySelector(".btnActivate");
    buttonActivate.addEventListener("click", () => {
      this.enabled = true;
    });
    let buttonDeactivate = this.target.querySelector(".btnDeactivate");
    buttonDeactivate.addEventListener("click", () => {
      this.enabled = false;
      this.detach();
    });
  }

  keydownHandler = (e) => {
    for (let action in this.actionsToBind) {
      if (this.actionsToBind[action].keys.includes(e.keyCode)) {
        this.enableAction(action);
      }
    }
  };

  keyupHandler = (e) => {
    for (let action in this.actionsToBind) {
      if (this.actionsToBind[action].keys.includes(e.keyCode)) {
        this.disableAction(action);
      }
    }
  };

  bindActions(actionsToBind) {
    this.actionsToBind = actionsToBind;
  }

  enableAction(actionName) {
    if (this.isActionActive(actionName)) {
      return;
    }
    if (this.focused) {
      this.actionsToBind[actionName].enabled = true;
      let event = new Event(actionName);
      window.dispatchEvent(event);
    }
  }

  disableAction(actionName) {
    this.actionsToBind[actionName].enabled = false;
    let event = new Event(this.ACTION_DEACTIVATED);
    window.dispatchEvent(event);
  }

  attach(target, dontUnable) {
    if (dontUnable) {
      return;
    }
    target.addEventListener("keydown", this.keydownHandler);
    target.addEventListener("keyup", this.keyupHandler);
  }

  detach() {
    this.target.removeEventListener("keydown", this.keydownHandler);
    this.target.removeEventListener("keyup", this.keyupHandler);
  }

  isActionActive(action) {
    if (this.actionsToBind[action].enabled === true) {
      return true;
    } else {
      return false;
    }
  }

  isKeyPressed(keyCode) {
    if (window.event.keyCode === keyCode) {
      return true;
    }
  }
}
