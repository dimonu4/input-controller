"use strict";
const settings = {
  plugins: [
    {
      cls: KeyBoardController,
      type: "keyboard",
      keys: ["key"]
    }
  ]
}
class inputController {
  controllersArray = [];
  focused;
  controllers;
  plugins= {};

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target;
    this.createControllersArray();
    this.chooseController();
  }

  createControllersArray() {
    for (let action in this.actionsToBind) {
      if (
        this.controllersArray.includes(
          Object.keys(this.actionsToBind[action])[0]
        )
      )
        continue;
      this.controllersArray.push(Object.keys(this.actionsToBind[action])[0]);
    }

    {
      this.controllers = {
        keys: () => {
          this.controllersArray[0] = new KeyBoardController(
            this.actionsToBind,
            this.target
          );
        },
      };
    }
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

  attach(target, dontUnable) {
    if (this.controllersArray.length) {
      this.controllersArray.forEach((controller) => {
        controller.attach(target, !controller.enabled);
      });
    }
  }

  detach() {
    if (this.controllersArray.length) {
      this.controllersArray.forEach((controller) => {
        controller.detach();
      });
    }
  }

  enabled(bool) {
    if (this.controllersArray.length) {
      this.controllersArray.forEach((controller) => {
        controller.enabled = bool;
        controller.focused((isfocus) => {
          this.controller = isfocus;
        });
      });
    }
  }

  bindActions(actionsToBind) {
    if (this.controllersArray.length) {

      Object.entries(actionsToBind).forEach(([key, value])=>{
        settings//
        const pluginData;

        if(!this.plugins[pluginData.type]){
          this.plugins[pluginData.type] = new pluginData.cls();
        }
      })
      this.controllersArray.forEach((controller) => {
        controller.actionsToBind = actionsToBind;
      });
    }
  }
}

class PluginControllers {
  ACTION_DEACTIVATED = "input-controller:action-deactivated";

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target;
  }

  set enabled(value) {
    // debugger;
    this._enabled = value;
    if (!this.enabled) {
      this.detach();
    }
  }

  get enabled() {
    return this._enabled;
  }

  // attach() {}

  enableAction(actionName) {
    if (!actionName) {
      return;
    }
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
  _key = [];
  constructor(actionsToBind, target) {
    super(actionsToBind, target);
  }

  focused(callback) {
    const testArea = this.target.querySelector(".test");

    testArea.addEventListener("focus", () => {
      this.focused = true;
      callback(this.focused);
    });
    testArea.addEventListener("blur", () => {
      this.focused = false;
      callback(this.focused);
    });
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
    this._key.push(window.event.keyCode);
    for (let action in this.actionsToBind) {
      if (this.actionsToBind[action].keys.includes(e.keyCode)) {
        this.enableAction(action);
      }
    }
  };

  keyupHandler = (e) => {
    this._key = [];
    for (let action in this.actionsToBind) {
      if (this.actionsToBind[action].keys.includes(e.keyCode)) {
        this.disableAction(action);
      }
    }
  };

  isKeyPressed(keyCode) {
    return this._key.includes(keyCode);
  }
}
