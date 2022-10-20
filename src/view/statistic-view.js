import { createElement } from "../render";

const createStatisticView = () => (
`<p class="statistic__rank">
  Your rank
  <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">Sci-Fighter</span>
</p>`
);

export default class StatisticView {
  getTemplate() {
    return createStatisticView();
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