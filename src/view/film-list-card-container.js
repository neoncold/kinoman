import { createElement } from "../render";

const createFilmListCardContainer = () => (
`<div class="films-list__container"></div>`
);

export default class FilmListCardContainer {
  getTemplate() {
    return createFilmListCardContainer();
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