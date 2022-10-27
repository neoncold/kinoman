import MainNav from './main-nav.js';
import MainSort from './main-sort.js';
import FilmListSectionContainer from './film-list-section-container.js';
import FilmListContainer from './film-list-container.js';
import FilmListCardContainer from './film-list-card-container.js';
import FilmListCard from './film-list-card.js';
import ShowMoreButton from './show-more-button.js';
import {render} from '../render.js';

export default class FilmListPresenter {
  filmListSectionContainer = new FilmListSectionContainer();
  filmListContainer = new FilmListContainer();
  filmListCardContainer = new FilmListCardContainer();

  init = (renderPlace, cardFilmModel) => {
    this.renderPlace = renderPlace;
    this.cardFilmModel = cardFilmModel;
    this.filmCards = [...this.cardFilmModel.getCards()];

    render(new MainNav(), this.renderPlace);
    render(new MainSort(), this.renderPlace);
    render(this.filmListSectionContainer, this.renderPlace);
    render(this.filmListContainer, this.filmListSectionContainer.getElement());
    render(this.filmListCardContainer, this.filmListContainer.getElement());
    
    for (let i = 0; i < this.filmCards.length; i++) {
      render(new FilmListCard(this.filmCards[i]), this.filmListCardContainer.getElement());
    }

    render(new ShowMoreButton(), this.renderPlace)
  };
}