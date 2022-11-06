import MainNav from './main-nav.js';
import MainSort from './main-sort.js';
import FilmListCard from './film-list-card.js';
import ShowMoreButton from './show-more-button.js';
import {render} from '../render.js';
import FilmListLoading from './film-list-loading.js';
import FilmListNoData from './film-list-no-data.js';
import FilmList from './film-list.js';
import PopupComponent from './popup-component.js';

const CARD_COUNT = 5;

const removeComponent = (element) => {
  if (!element.element) {
    return
  }
  element.element.remove();
  element.removeElement();
}
/* 
не работает удаление евент листнера так как это стрелочная функция
ещё нужно поправить жанры в попапе details
 */

export default class FilmListPresenter {
  
  init = (renderPlace, filmsArray) => {
    this.renderPlace = renderPlace;
    this.filmsArray = filmsArray;
    this.MainNav = new MainNav(this.filmsArray);
    this.MainSort = new MainSort(this.filmsArray);
    this.filmList = new FilmList();
    this.filmListLoading = new FilmListLoading();
    this.filmListNoData = new FilmListNoData();
    this.showMoreButton = new ShowMoreButton();
    

    render(this.MainNav, this.renderPlace);
    render(this.MainSort, this.renderPlace);
    render(this.filmListLoading, this.renderPlace);

    if (filmsArray.length) {
      removeComponent(this.filmListLoading);
    } else {
      removeComponent(this.filmListLoading);
      render(this.filmListNoData, this.renderPlace);
      return;
    }      

    render(this.filmList, this.renderPlace);
    
    const filmListContainer = this.filmList.getElement().querySelector('.films-list__container');
    
    for (let i = 0; i < CARD_COUNT; i++) {
      render(new FilmListCard(this.filmsArray[i]), filmListContainer);
    }
    
    if (filmsArray.length > 5) {
      render(this.showMoreButton, this.renderPlace);
    
      this.showMoreButton.getElement().addEventListener('click', () => {
        const numberOfExistingCards = document.querySelectorAll('.film-card').length;
        const numberOfRestCards = this.filmsArray.length - numberOfExistingCards;
        const count = numberOfRestCards >= CARD_COUNT ? CARD_COUNT : numberOfRestCards;

        for (let i = numberOfExistingCards; i < numberOfExistingCards + count; i++) {
          render(new FilmListCard(this.filmsArray[i]), filmListContainer);
        }

        if (count == numberOfRestCards) {
          removeComponent(this.showMoreButton);
        }
      });
    }

    
    filmListContainer.addEventListener('click', (e) => {
      const targetCard = e.target.closest('.film-card');

      if (!targetCard) return;
      // const filmInfo = dataArray.find((elem) => elem.film_info.title == targetCard.firstElementChild.innerHTML);
      const targetCardIndex = Array.from(filmListContainer.children).indexOf(targetCard);
      const filmInfo = filmsArray[targetCardIndex];

      const popup = new PopupComponent(filmInfo);
      render(popup, document.body)

      popup.setClickHandler(() => {
        // popup.removeClickHandler();
        removeComponent(popup);
      })
    });
  };
}