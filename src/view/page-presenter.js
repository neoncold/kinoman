import ProfileButton from './profile-button.js';
import FooterStatistic from './footer-statistic.js';
import MainNav from './main-nav.js';
import MainSort from './main-sort.js';
import ShowMoreButton from './show-more-button.js';
import FilmListLoading from './film-list-loading.js';
import FilmListNoData from './film-list-no-data.js';
import FilmList from './film-list.js';
// import FilmListPresenter from './film-list-presenter.js';
import { render } from '../render.js';
import { removeComponent } from '../utils.js';
import MovieController from './movie-controller.js';
import { RENDER_CARD_COUNT } from '../config.js';

/* 
нужно доделать обновление компонентов звания профиля,
а так же навигационные ярлычки, посмотреть баги, а потом
дальше по заданию
*/

export default class PagePresenter {
  constructor(renderPlace) {
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._filmsList = [];
    this.renderPlace = renderPlace;
    this.filmList = new FilmList();
    this.filmListContainer = this.filmList.getElement().querySelector('.films-list__container');
    this.filmListLoading = new FilmListLoading();
    this.filmListNoData = new FilmListNoData();
    this.showMoreButton = new ShowMoreButton();
    this.mainSort = new MainSort();

  }
  _onDataChange(oldData, newData) {
   const index = this._filmsList.findIndex((elem) => elem.film === oldData);
   if (index !== -1) {
    this._filmsList[index].film = newData;
    this.filmsArray[index] = newData;

    this._filmsList[index].updateComponents(this._filmsList[index].film);
    this.mainNav.rerender();
    this.profileButton.rerender();
   }
  }

  _onViewChange() {
    this._filmsList.forEach((film) => film.setDefaultView())
  }

  render = (filmsArray) => {
    this.filmsArray = filmsArray;
    this.mainNav = new MainNav(this.filmsArray);
    this.profileButton = new ProfileButton(this.filmsArray);

    // Нахожение и рендеринг аватарки и статистики футера
    const siteHeaderElement = document.querySelector('.header');
    const siteFooterStatisticContainer = document.querySelector('.footer__statistics');

    render(this.profileButton, siteHeaderElement);
    render(new FooterStatistic(this.filmsArray.length), siteFooterStatisticContainer);

    // рендер навигации, сортировочных кнопок, индикации загрузки
    render(this.mainNav, this.renderPlace);
    render(this.mainSort, this.renderPlace);
    render(this.filmListLoading, this.renderPlace);

    // удаление индикации загрузки если есть данные и рендер сообщения об отсутствии фильмов если нет данных
    if (filmsArray.length) {
      removeComponent(this.filmListLoading);
       // рендер контейнера для карточек фильмов
      render(this.filmList, this.renderPlace);
    } else {
      // Если нет фильмов
      removeComponent(this.filmListLoading);
      render(this.filmListNoData, this.renderPlace);
      return;
    }      

    //Рендер первых карточек фильмов
    if (this.filmsArray.length > RENDER_CARD_COUNT) {
      //Рендерим устан. кол-во карточек если хватает
      this.renderFilms(this.filmsArray.slice(0, RENDER_CARD_COUNT), this.filmListContainer);
      render(this.showMoreButton, this.filmListContainer, 'afterend');
      
      const showMoreHandler = () => {
        // отрисовка фиксированного колличества фильмов или остатка
        this.renderFilms(this.filmsArray, this.filmListContainer);
        
        // Удалить showMoreButton если фильмы закончились
        if (this.filmListContainer.children.length == filmsArray.length) {
          removeComponent(this.showMoreButton);
        }
      }

      // добавление логики работы кнопки showMore ИСПРАВИТЬ
      this.showMoreButton.setClickHandler(showMoreHandler);
    } else {
      // если в массиве меньше REBDER_CARD_COUNT рендер всех
      this.renderFilms(this.filmsArray.slice(), this.filmListContainer);
    }
    
    // Логика работы кнопок сортировки
    const sortingFilmsArray = (sortingType) => {
      this.filmListContainer.innerHTML = '';
      let sortedArray = this.filmsArray.slice();

      switch (sortingType) {
        case 'default':
          sortedArray = this.filmsArray;
        break;
        case 'date':
          sortedArray.sort((a,b) => b.film_info.release.date - a.film_info.release.date );
        break;

        case 'rating':
          sortedArray.sort((a,b) => (+b.film_info.totalRating - +a.film_info.totalRating).toFixed(1));    
        break;
      }

      this.renderFilms(sortedArray, this.filmListContainer);
      if (!this.showMoreButton._element && this.filmListContainer.children.length > RENDER_CARD_COUNT) {
        render(this.showMoreButton, this.filmListContainer, 'afterend');
        this.showMoreButton.rerender();
      }
      //и проверить слетают ли обработчики
    }
    
    // добавление обработчика кнопкам сортировки
    this.mainSort.setClickHandler(sortingFilmsArray)
  };

  renderFilms(filmsArray, container) {
    // колличество существующих карточек
    const existingAmount = this.filmListContainer.children.length;
    // Оставшееся колличество или RENDER_CARD_COUNT;
    const amountToRender = existingAmount + Math.min(RENDER_CARD_COUNT, (filmsArray.length - existingAmount))
    const films = filmsArray.slice(existingAmount, amountToRender)
    for (const film of films ) {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange);
      this._filmsList.push(movieController);
      movieController.render(film);
    }
  }
}