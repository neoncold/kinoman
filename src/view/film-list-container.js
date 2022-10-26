import { createElement } from "../render";

const isLoaded = true;
const isLoading = false;

const createFilmListContainer = () => (
`<section class="films-list">
    <h2 class="films-list__title 
    ${(isLoaded)  ? 'visually-hidden">All movies. Upcoming</h2>' 
    : (isLoading) ? '>Loading...</h2>' 
                  : '>There are no movies in our database</h2>'}
</section>`
);

export default class FilmListContainer {
  getTemplate() {
    return createFilmListContainer();
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