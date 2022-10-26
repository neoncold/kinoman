import { createElement } from "../render";

const createPopupSection = () => (
`<section class="film-details"></section>`
);

export default class PopupSection {
  getTemplate() {
    return createPopupSection();
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
  removeElement() {
    this.element = null;
  }
}