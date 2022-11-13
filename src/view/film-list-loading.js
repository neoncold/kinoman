import Abstract from "./abstract";

const createFilmListLoading = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`
);

export default class FilmListLoading extends Abstract{
  getTemplate() {
    return createFilmListLoading();
  }
}