import Abstract from "./abstract";
import { SortTypes } from "../utils";

const createMainSort = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortTypes.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class MainSort extends Abstract {
  getTemplate() {
    return createMainSort();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler)
  }
}