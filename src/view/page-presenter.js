import ProfileButton from './profile-button.js';
import FooterStatistic from './footer-statistic.js';
import MainNav from './main-nav.js';
import MainSort from './main-sort.js';
import ShowMoreButton from './show-more-button.js';
import FilmListLoading from './film-list-loading.js';
import FilmListNoData from './film-list-no-data.js';
import FilmList from './film-list.js';
import FilmListPresenter from './film-list-presenter.js';
import { render } from '../render.js';
import { removeComponent, sortArrayByType } from '../utils.js';


export default class PagePresenter {
  
  render = (renderPlace, filmsArray) => {
    this.renderPlace = renderPlace;
    this.filmsArray = filmsArray;
    this.mainNav = new MainNav(this.filmsArray);
    this.mainSort = new MainSort(this.filmsArray);
    this.filmList = new FilmList();
    this.filmListPresenter = new FilmListPresenter();
    this.filmListLoading = new FilmListLoading();
    this.filmListNoData = new FilmListNoData();
    this.showMoreButton = new ShowMoreButton();
    
    // Нахожение и рендеринг аватарки и статистики футера
    const siteHeaderElement = document.querySelector('.header');
    const siteFooterStatisticContainer = document.querySelector('.footer__statistics');

    render(new ProfileButton(this.filmsArray), siteHeaderElement);
    render(new FooterStatistic(this.filmsArray.length), siteFooterStatisticContainer);

    // рендер навигации, сортировочных кнопок, индикации загрузки
    render(this.mainNav, this.renderPlace);
    render(this.mainSort, this.renderPlace);
    render(this.filmListLoading, this.renderPlace);

    // удаление индикации загрузки если есть данные и рендер сообщения об отсутствии фильмов если нет данных
    if (filmsArray.length) {
      removeComponent(this.filmListLoading);
    } else {
      removeComponent(this.filmListLoading);
      render(this.filmListNoData, this.renderPlace);
      return;
    }      
    
    
    // рендер контейнера для карточек фильмов
    render(this.filmList, this.renderPlace);
    
    const filmListContainer = this.filmList.getElement().querySelector('.films-list__container');
    
    this.filmListPresenter.init(filmListContainer, this.filmsArray)
    // открисовка кнопки showMore
    if (this.filmsArray.length > 5) {
      render(this.showMoreButton, this.renderPlace);
      
      // добавление логики работы кнопки showMore
      this.showMoreButton.getElement().addEventListener('click', () => {
        
        this.filmListPresenter.init();
        
        // Удалить showMoreButton если фильмы закончились
        if (filmListContainer.children.length == filmsArray.length) {
          removeComponent(this.showMoreButton);
        }
      });
    }
    
    // Логика работы кнопок сортировки
    const sortingFilmsArray = (sortingType) => {
      filmListContainer.innerHTML = '';
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

      this.filmListPresenter.init(this.filmListContainer, sortedArray);
    }
    
    // добавление обработчика кнопкам сортировки
    this.mainSort.setClickHandler(sortingFilmsArray)


  };
}