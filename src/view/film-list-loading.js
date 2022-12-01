import Abstract from "./abstract";

const createFilmListLoading = () => (
  `<h2 class="films-list__title">Loading...</h2>`
);

export default class FilmListLoading extends Abstract{
  getTemplate() {
    return createFilmListLoading();
  }
}