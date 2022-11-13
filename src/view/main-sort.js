import Abstract from "./abstract";

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createMainSort = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class MainSort extends Abstract {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createMainSort();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      const sortButton = evt.target.closest('.sort__button')

      if (sortButton.classList.contains('.sort__button--active')) return;

      this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active');
      sortButton.classList.add('sort__button--active')

      this._currentSortType = sortButton.dataset.sortType;
      handler(this._currentSortType);
    })
  }
}