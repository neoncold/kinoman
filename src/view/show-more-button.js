import { createElement } from "../render";

const createShowMoreButton = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ShowMoreButton {
  getTemplate() {
    return createShowMoreButton();
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