import Abstract from "./abstract";

const createShowMoreButton = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ShowMoreButton extends Abstract{
  getTemplate() {
    return createShowMoreButton();
  }
  setClickHandler(handler = this._onClickHandler) {
    this._onClickHandler = handler;
    this.getElement().addEventListener('click', this._onClickHandler);
  }
  _subscribeOnEvents() {
    this.setClickHandler();
  }
}