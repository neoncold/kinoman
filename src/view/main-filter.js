import { FilterTypes } from "../utils";
import Abstract from "./abstract";

const filmsTypeCount = (films, type) => {
  return films.reduce((acc, curr) => curr.user_details[type] ? ++acc : acc, 0)
}

const createMainFilter = (cardsArray, activeButton) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item${activeButton == FilterTypes.DEFAULT ? " main-navigation__item--active" : ""}" data-filter-type="${FilterTypes.DEFAULT}">All movies</a>
      <a href="#watchlist" class="main-navigation__item${activeButton == FilterTypes.WATCHLIST ? " main-navigation__item--active" : ""}" data-filter-type="${FilterTypes.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${filmsTypeCount(cardsArray, 'inWatchedList')}</span></a>
      <a href="#history" class="main-navigation__item${activeButton == FilterTypes.HISTORY ? " main-navigation__item--active" : ""}" data-filter-type="${FilterTypes.HISTORY}">History <span class="main-navigation__item-count" data-filter-type="${FilterTypes.HISTORY}">${filmsTypeCount(cardsArray, 'alreadyWatched')}</span></a>
      <a href="#favorites" class="main-navigation__item${activeButton == FilterTypes.FAVORITES ? " main-navigation__item--active" : ""}" data-filter-type="${FilterTypes.FAVORITES}">Favorites <span class="main-navigation__item-count" data-filter-type="${FilterTypes.FAVORITES}">${filmsTypeCount(cardsArray, 'favorite')}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class MainFilter extends Abstract{
  constructor(cardsArray) {
    super();
    this.cardsArray = cardsArray;
    this.activeButton = FilterTypes.DEFAULT;
  }

  getTemplate() {
    return createMainFilter(this.cardsArray, this.activeButton);
  }

  setClickHandler(handler = this.clickHandler) {
    this.clickHandler = handler;
    this.getElement().addEventListener('click', this.clickHandler)
  }

  _subscribeOnEvents() {
    this.setClickHandler();
  }
}