import { createElement } from "../render";

const createFormDetailsBottomSectionWrapper = () => (
`<section class="film-details__comments-wrap"></section>`
);

export default class FormDetailsBottomSectionWrapper {
  getTemplate() {
    return createFormDetailsBottomSectionWrapper();
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