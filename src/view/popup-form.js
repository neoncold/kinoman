import { createElement } from "../render";

const createPopupForm = () => (
`<form class="film-details__inner" action="" method="get"></form>`
);

export default class PopupForm {
  getTemplate() {
    return createPopupForm();
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