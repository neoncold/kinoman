import Abstract from "./abstract";

const createFilmListNoData = () => (
  `<h2 class="films-list__title">There are no movies in our database</h2>`
);

export default class FilmListNoData extends Abstract{
  getTemplate() {
    return createFilmListNoData();
  }
}