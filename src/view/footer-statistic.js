import { createElement } from "../render";

const createFooterStatistic = () => (
  `<section class="footer__statistics">
  <p>130 291 movies inside</p>
  </section>`
);

export default class FooterStatistic {
  getTemplate() {
    return createFooterStatistic();
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