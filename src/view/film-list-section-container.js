import { createElement } from "../render.js";

const createFilmListSectionContainer = () => (
  `<section class="films"></section>`
);

export default class FilmListSectionContainer {
  getTemplate() {
    return createFilmListSectionContainer();
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