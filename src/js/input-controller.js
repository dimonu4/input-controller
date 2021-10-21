"use strict";
class inputController {
  focused;
  ACTION_ACTIVATED = "input-controller:action-activated";
  ACTION_DEACTIVATED = "input-controller:action-deactivated";
  controllers = {
    keys: "keyBoardController",
    mouse: "mouseController",
  };

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
    this.chooseController();
  }

  chooseController() {
    // console.log(Object.values(this.controllers).indexOf("mouse"));
    let keywords = [];
    for (let action in this.actionsToBind) {
      {
        keywords.push(Object.keys(this.actionsToBind[action])[0]);
      }
    }
    for (let keyword of keywords) {
      if (keyword in this.controllers) {
        console.log(this.controllers[keyword]);
      }
    }
    console.log(keywords);
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

  isActionActive(action) {
    return !!this.actionsToBind[action].enabled;
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

  isKeyPressed(keyCode) {
    return window.event.keyCode === keyCode;
  }
}

class PluginControllers {
  constructor(actionsToBind, target) {
    this.actionToBind = actionsToBind;
    this.target = target;
  }
}
class keyBoardController extends PluginControllers {
  constructor(actionsToBind, target) {
    super(actionsToBind, target);
    console.log("created keyboard controller");
  }
}
