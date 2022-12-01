import ProfileButton from '../view/profile-button.js';
import FooterStatistic from '../view/footer-statistic.js';
import MainSort from '../view/main-sort.js';
import ShowMoreButton from '../view/show-more-button.js';
import FilmListLoading from '../view/film-list-loading.js';
import FilmListNoData from '../view/film-list-no-data.js';
import FilmList from '../view/film-list.js';
import { render } from '../render.js';
import { removeComponent } from '../utils.js';
import MovieController from './movie-controller.js';
import { RENDER_CARD_COUNT } from '../config.js';

/* 
Заметки:
  0) попрактиковаться устанавливать положение окна после перерисовки
  в то же положение что и до
  1) установить Npm пакет 'he' для превращения ввода в строку
*/

export default class PageController {
  constructor(renderPlace, model) {
    this.model = model;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._movieControllerList = [];
    this.renderPlace = renderPlace;
    this.filmList = new FilmList();
    this.filmListContainer = this.filmList.getElement().querySelector('.films-list__container');
    this.filmListLoading = new FilmListLoading();
    this.filmListNoData = new FilmListNoData();
    this.showMoreButton = new ShowMoreButton();
    this.mainSort = new MainSort();
  }

  _onViewChange() {
    this._movieControllerList.forEach((controller) => controller.setDefaultView())
  }

  _onDataChange(oldFilmId, newFilm) {
    this.model.updateFilm(oldFilmId, newFilm);

    const index = this._movieControllerList.findIndex((controller) => controller.film.id === oldFilmId)
    this.filmsArray = this.model.filmsList;
    this._movieControllerList[index].update(newFilm);

  }

  render = () => {
    this.filmsArray = this.model.getFilms();
    this.profileButton = new ProfileButton(this.filmsArray);

    // Нахожение и рендеринг аватарки и статистики футера
    const siteHeaderElement = document.querySelector('.header');
    const siteFooterStatisticContainer = document.querySelector('.footer__statistics');

    // рендер профайла и статистики футера
    render(this.profileButton, siteHeaderElement);
    render(new FooterStatistic(this.filmsArray.length), siteFooterStatisticContainer);

    // рендер навигации, сортировочных кнопок, индикации загрузки
    render(this.mainSort, this.renderPlace);
    // рендер контейнера для карточек фильмов
    render(this.filmList, this.renderPlace);
    render(this.filmListLoading, this.filmListContainer, 'beforebegin');

    // удаление индикации загрузки если есть данные и рендер сообщения об отсутствии фильмов если нет данных
    if (this.filmsArray.length) {
      removeComponent(this.filmListLoading);
    } else {
      // Если нет фильмов
      removeComponent(this.filmListLoading);
      render(this.filmListNoData, this.filmListContainer, 'beforebegin');
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
        if (this.filmListContainer.children.length == this.filmsArray.length) {
          removeComponent(this.showMoreButton);
        }
      }

      // добавление логики работы кнопки showMore 
      this.showMoreButton.setClickHandler(showMoreHandler);
    } else {
      // если в массиве меньше REBDER_CARD_COUNT рендер всех
      this.renderFilms(this.filmsArray.slice(), this.filmListContainer);
    }
    
    // Логика работы кнопок сортировки
    const onClickSortHandler = () => {
      event.preventDefault();

      const clickedButton = event.target.closest('.sort__button')
      // проверка на повторное нажатие и промах
      if (!clickedButton || clickedButton.classList.contains('.sort__button--active')) return;

      // визуальное отображение активной кнопки
      this.mainSort.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active');
      clickedButton.classList.add('sort__button--active')

      // назначение активного фильтра модели
      this.model.activeSortType = clickedButton.dataset.sortType;      
    }
    
    // добавление обработчика кнопкам сортировки
    this.mainSort.setClickHandler(onClickSortHandler);

    // обработчик изменения типа фильтра или сортировки
    const filterAndSortHandler = () => {
      // отчистка контейнера фильмов перед рендером
      this.filmListContainer.innerHTML = '';
      // получение списка фильмов согласно сортировке
      const filteredAndSortedArray = this.model.getFilms();
      
      // если фильмы отсутствуют
      if (!filteredAndSortedArray.length) {
        // заглушка
        render(this.filmListNoData, this.filmListContainer, 'beforebegin');
        return;
      }
      // если фильмы есть удалить заглушку
      removeComponent(this.filmListNoData);
      
      // Отчистка массива контроллеров перед рендером новых
      this._movieControllerList = [];

      // рендер отсортированных фильмов
      this.renderFilms(filteredAndSortedArray, this.filmListContainer);

      // рендер кнопки ShowMore
      if (!this.showMoreButton._element && filteredAndSortedArray.length > RENDER_CARD_COUNT) {
        render(this.showMoreButton, this.filmListContainer, 'afterend');
        this.showMoreButton.recoverListeners();
        
      } else if (filteredAndSortedArray.length <= RENDER_CARD_COUNT) {
        removeComponent(this.showMoreButton)
      }

    }

    this.model.setFilterAndSortHandler(filterAndSortHandler.bind(this));
  };

  renderFilms(filmsArray, container) {
    // колличество существующих карточек
    const existingAmount = this.filmListContainer.children.length;
    // Оставшееся колличество или RENDER_CARD_COUNT;
    const amountToRender = existingAmount + Math.min(RENDER_CARD_COUNT, (filmsArray.length - existingAmount))
    const films = filmsArray.slice(existingAmount, amountToRender)
    for (const film of films ) {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onDataCommentsChange);
      this._movieControllerList.push(movieController);
      movieController.render(film);
    }
  }
}