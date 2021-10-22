"use strict";
class inputController {
  keyboard;
  controllers = {
    keys: () => {
      this.keyboard = new KeyBoardController(this.actionsToBind, this.target);
    },
  };

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target;
    this.chooseController();
  }

  chooseController() {
    let keywords = [];
    for (let action in this.actionsToBind) {
      if (keywords.includes(Object.keys(this.actionsToBind[action])[0]))
        continue;
      keywords.push(Object.keys(this.actionsToBind[action])[0]);
    }
    for (let keyword of keywords) {
      if (keyword in this.controllers) {
        this.controllers[keyword]();
      }
    }
  }
}

class PluginControllers {
  focused;
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
  }

  set enabled(value) {
    this._enabled = value;
    if (!this.enabled) {
      this.detach();
    }
  }

  get enabled() {
    return this._enabled;
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

  isActionActive(action) {
    return !!this.actionsToBind[action].enabled;
  }

  bindActions(actionsToBind) {
    this.actionsToBind = actionsToBind;
  }
}
class KeyBoardController extends PluginControllers {
  constructor(actionsToBind, target) {
    super(actionsToBind, target);
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

  isKeyPressed(keyCode) {
    return window.event.keyCode === keyCode;
  }
  sayHi() {
    console.log("hi");
  }
}
