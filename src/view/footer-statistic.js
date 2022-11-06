import { createElement } from "../render";

const createFooterStatistic = (totalCount) => (
  `<section class="footer__statistics">
  <p>${totalCount} movies inside</p>
  </section>`
);

export default class FooterStatistic {
  constructor(totalCount) {
    this.totalCount = totalCount;
  }
  getTemplate() {
    return createFooterStatistic(this.totalCount);
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