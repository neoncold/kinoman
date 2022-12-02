import { createElement } from "../render";
import SmartAbstract from "./smart-abstract";

export default class Abstract extends SmartAbstract{
  constructor() {
    super();
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  hide() {
    this.getElement().classList.add('visually-hidden');
  }

  show() {
    this.getElement().classList.remove('visually-hidden');
  }
}