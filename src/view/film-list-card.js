import { formatDuration } from "../utils";
import Abstract from "./abstract";
import moment from "moment";



const createFilmListCard = (card) => (
  `<article class="film-card">
    <h3 class="film-card__title">${card.film_info.title}</h3>
    <p class="film-card__rating">${card.film_info.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(card.film_info.release.date).format('YYYY')}</span>
      <span class="film-card__duration">${formatDuration(card.film_info.runtime)}</span>
      <span class="film-card__genre">${card.film_info.genre}</span>
    </p>
    <img src="./images/posters/${card.film_info.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${card.film_info.description.length > 140 ? card.film_info.description.slice(0,139) + "..." : card.film_info.description}</p>
    <a class="film-card__comments">${card.comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${card.user_details.inWatchedList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${card.user_details.alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${card.user_details.favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`
);

export default class FilmListCard extends Abstract {
  constructor(card) {
    super();
    this.card = card;
  }

  getTemplate() {
    return createFilmListCard(this.card);
  }

  setClickHandler(handler = this._clickHandler) {
    this._clickHandler = handler;
    this.getElement().addEventListener('click', this._clickHandler)
  }

  onFilmCardControlClick(handler = this._onFilmCardControlClick) {
    this._onFilmCardControlClick = handler;
    this.getElement().querySelector('.film-card__controls').addEventListener('click', this._onFilmCardControlClick)
  }

  _subscribeOnEvents() {
    this.setClickHandler();
    this.onFilmCardControlClick();
  }
}