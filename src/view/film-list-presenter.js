import FilmListCard from './film-list-card.js';
import { render } from '../render.js';
import { RENDER_CARD_COUNT } from '../config.js';

export default class FilmListPresenter {
  
  init = (renderPlace = this.renderPlace, filmsArray = this.filmsArray) => {
    this.renderPlace = renderPlace;
    this.filmsArray = filmsArray;
    this.renderCardCount = 5;

    // данные отсутствуют
    if (!this.filmsArray.length) return;

    // колличество существующих карточек
    const existingAmount = renderPlace.children.length;
    // Оставшееся колличество или RENDER_CARD_COUNT;
    const amountToRender = existingAmount + Math.min(this.renderCardCount, (filmsArray.length - existingAmount))
    
    // отрисовка карточек
    for (let i = existingAmount; i < amountToRender; i++) {
      render(new FilmListCard(this.filmsArray[i]), renderPlace);
    }
  }
}