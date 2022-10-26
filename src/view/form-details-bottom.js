import { createElement } from "../render";

const createFormDetailsBottom = () => (
`<div class="form-details__bottom-container"></div>`
);

export default class FormDetailsBottom {
  getTemplate() {
    return createFormDetailsBottom();
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