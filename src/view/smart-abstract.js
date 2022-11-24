
export default class SmartAbstract {
  constructor() {
    if (new.target === SmartAbstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }
  _subscribeOnEvents() {
    return;
  }

  recoverListeners() {
    this._subscribeOnEvents();
  }
  rerender() {
    const oldElement = this.getElement();

    this.removeElement();
    
    const newElement = this.getElement();
    oldElement.replaceWith(newElement);
    this.recoverListeners();
  }
}