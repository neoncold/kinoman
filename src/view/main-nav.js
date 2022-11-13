import Abstract from "./abstract";

const createMainNav = (cardsArray) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${cardsArray.reduce((accumulator, current) => current.user_details.inWatchedList ? ++accumulator : accumulator, 0)}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${cardsArray.reduce((accumulator, current) => current.user_details.alreadyWatched ? ++accumulator : accumulator, 0)}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${cardsArray.reduce((accumulator, current) => current.user_details.favorite ? ++accumulator : accumulator, 0)}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class MainNav extends Abstract{
  constructor(cardsArray) {
    super();
    this.cardsArray = cardsArray;
  }
  getTemplate() {
    return createMainNav(this.cardsArray);
  }
}