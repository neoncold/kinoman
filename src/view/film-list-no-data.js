import Abstract from "./abstract";

const createFilmListNoData = () => (
  `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`
);

export default class FilmListNoData extends Abstract{
  getTemplate() {
    return createFilmListNoData();
  }
}