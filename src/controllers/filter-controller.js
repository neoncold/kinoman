import MainFilter from "../view/main-filter";
import { render } from "../render";




export default class FilterController {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.updateComponents = this.updateComponents.bind(this);
  }

  render() {
    this.mainFilter = new MainFilter(this.model.getFilms());

    // обработчик клика
    const mainFilterClickHandler = () => {
      event.preventDefault();
      const clickedButton = event.target.closest('a');
      // проверка на повторное нажатие и промах
      if (!clickedButton || clickedButton.classList.contains('main-navigation__item--active')) return;

      // внешнее отображение клика
      const activeStyleButton = this.mainFilter.getElement().querySelector('.main-navigation__item--active');
      activeStyleButton.classList.remove('main-navigation__item--active');
      clickedButton.classList.add('main-navigation__item--active');
      
      // клик по статистике
      if (clickedButton.classList.contains('main-navigation__additional')) return;
      
      
      // смена типа активного фильтра
      this.model.activeFilterType = clickedButton.dataset.filterType;
    }
    this.mainFilter.setClickHandler(mainFilterClickHandler);

    this.model.setUpdateFilter(this.updateComponents)

    // Отрисовка панели фильтров
    render(this.mainFilter, this.container);
  }

  updateComponents() {
    this.mainFilter.cardsArray = this.model.filmsList;
    this.mainFilter.activeButton = this.model._activeFilterType;
    this.mainFilter.rerender();
  }
}