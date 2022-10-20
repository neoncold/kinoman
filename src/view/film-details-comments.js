import { createElement } from "../render";

const createFilmDetailsComments = () => (
`<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>`
);

export default class FilmDetailsComments {
  getTemplate() {
    return createFilmDetailsComments();
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