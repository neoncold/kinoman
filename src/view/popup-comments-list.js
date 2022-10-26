import { createElement } from "../render";

const createPopupCommentsList = () => (
`<ul class="film-details__comments-list"></ul>`
);

export default class PopupCommentsList {
  getTemplate() {
    return createPopupCommentsList();
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
  removeElement() {
    this.element = null;
  }
}