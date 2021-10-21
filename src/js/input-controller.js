"use strict";
class inputController {
  enabled;
  focused;
  ACTION_ACTIVATED = "input-controller:action-activated";
  ACTION_DEACTIVATED = "input-controller:action-deactivated";

  constructor(actionsToBind, target) {
    this.actionsToBind = actionsToBind;
    this.target = target; 
    this.target.addEventListener("keydown", (e) => {
      for(let action in this.actionsToBind){
        if(this.isActionActive(action)){
          return
        }
        if(this.actionsToBind[action].keys.includes(e.keyCode)){
          this.enableAction(action)
        }
      }
    });
    this.target.addEventListener("keyup", (e) => {
      for(let action in this.actionsToBind){
        if(this.actionsToBind[action].keys.includes(e.keyCode)){
          this.disableAction(action)
        }
      }
    });
  }

  bindActions(actionsToBind) {
    this.actionsToBind = actionsToBind;
  }

  enableAction(actionName) {
    this.actionsToBind[actionName].enabled=true;
    // let e = new Event(this.ACTION_ACTIVATED);
    // window.dispatchEvent(e)
    let event = new Event(actionName)
    window.dispatchEvent(event)
  }

  disableAction(actionName) {
    this.actionsToBind[actionName].enabled=false;
    let event = new Event (this.ACTION_DEACTIVATED);
    window.dispatchEvent(event)
  }

  isActionActive(action) {
    if(this.actionsToBind[action].enabled === true){
      return true
    }
    // for (let i = 0; i < this.actionsToBind[action].keys.length; i++) {
    //   if (this.isKeyPressed(this.actionsToBind[action].keys[i])) {
    //     return true;
    //   }
    // }
  }

  isKeyPressed(keyCode) {
    if (window.event.keyCode === keyCode) {
      return true;
    }
  }
}
