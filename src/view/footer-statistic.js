import Abstract from "./abstract";

const createFooterStatistic = (totalCount) => (
  `<section class="footer__statistics">
  <p>${totalCount} movies inside</p>
  </section>`
);

export default class FooterStatistic extends Abstract{
  constructor(totalCount) {
    super();
    this.totalCount = totalCount;
  }
  getTemplate() {
    return createFooterStatistic(this.totalCount);
  }
}