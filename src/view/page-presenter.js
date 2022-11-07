import MainNav from './main-nav.js';
import MainSort from './main-sort.js';
import FilmListCard from './film-list-card.js';
import ShowMoreButton from './show-more-button.js';
import FilmListLoading from './film-list-loading.js';
import FilmListNoData from './film-list-no-data.js';
import FilmList from './film-list.js';
import PopupComponent from './popup-component.js';
import FilmListPresenter from './film-list-presenter.js';
import { render } from '../render.js';
import { removeComponent, sortArrayByType } from '../utils.js';
import { RENDER_CARD_COUNT } from '../config.js'

/* 
не работает удаление евент листнера так как это стрелочная функция
ещё нужно поправить жанры в попапе details
 */

export default class PagePresenter {
  
  init = (renderPlace, filmsArray) => {
    this.renderPlace = renderPlace;
    this.filmsArray = filmsArray;
    this.MainNav = new MainNav(this.filmsArray);
    this.MainSort = new MainSort(this.filmsArray);
    this.filmList = new FilmList();
    this.filmListPresenter = new FilmListPresenter();
    this.filmListLoading = new FilmListLoading();
    this.filmListNoData = new FilmListNoData();
    this.showMoreButton = new ShowMoreButton();
    

    // рендер навигации, сортировочных кнопок, индикации загрузки
    render(this.MainNav, this.renderPlace);
    render(this.MainSort, this.renderPlace);
    render(this.filmListLoading, this.renderPlace);

    // удаление индикации загрузки если есть данные и рендер сообщения об отсутствии фильмов если нет данных
    if (filmsArray.length) {
      removeComponent(this.filmListLoading);
    } else {
      removeComponent(this.filmListLoading);
      render(this.filmListNoData, this.renderPlace);
      return;
    }      
    
    // добавление логики работы кнопок сортировки
    const mainSort = this.MainSort.getElement();
    
    // рендер контейнера для карточек фильмов
    render(this.filmList, this.renderPlace);
    
    const filmListContainer = this.filmList.getElement().querySelector('.films-list__container');
    
    this.filmListPresenter.init(filmListContainer, this.filmsArray)
    // открисовка кнопки showMore
    if (filmsArray.length > 5) {
      render(this.showMoreButton, this.renderPlace);
      
      // добавление логики работы кнопки showMore
      this.showMoreButton.getElement().addEventListener('click', () => {
        
        this.filmListPresenter.init();
        
        if (filmListContainer.children.length == filmsArray.length) {
          removeComponent(this.showMoreButton);
        }
      });
    }
    
    // Логика работы кнопок сортировки
    
    mainSort.addEventListener('click', (e) => {
      e.preventDefault();
      const pressedButton = e.target.closest('.sort__button');
      // мимо кнопки
      if (!pressedButton) return;
      // повторное нажатие
      if (pressedButton.classList.contains('sort__button--active')) return;
      
      // управление классом активной кнопки
      const sortButtons = mainSort.querySelectorAll('.sort__button');
      sortButtons.forEach((elem) => {
        elem.classList.remove('sort__button--active')});
      pressedButton.classList.add('sort__button--active');
      
      // Отчистка контента
      filmListContainer.innerHTML = '';

      // тип сортировки
      const sortType = `${pressedButton.innerHTML}`;

      // функция рендера отсортированного массива

      const sortedArray = sortArrayByType(sortType, this.filmsArray);
      this.filmListPresenter.init(this.filmListContainer, sortedArray);
      
    });

    // добавление логики открытия и закрытия попапа
    filmListContainer.addEventListener('click', (e) => {
      const targetCard = e.target.closest('.film-card');
      
      if (!targetCard) return;
      
      const targetCardIndex = Array.from(filmListContainer.children).indexOf(targetCard);
      const filmInfo = filmsArray[targetCardIndex];
      const popup = new PopupComponent(filmInfo);
      
      render(popup, document.body);
      
      popup.setClickHandler(() => {
        // popup.removeClickHandler();
        removeComponent(popup);
      })
    });


  };
}