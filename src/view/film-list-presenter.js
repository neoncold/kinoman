import FilmListCard from './film-list-card.js';
import PopupComponent from './popup-component.js';
import { render } from '../render.js';
import { RENDER_CARD_COUNT } from '../config.js';
import { removeComponent } from '../utils.js';


export default class FilmListPresenter {
  
  init = (renderPlace = this.renderPlace, filmsArray = this.filmsArray) => {
    this.renderPlace = renderPlace;
    this.filmsArray = filmsArray;
    this.renderCardCount = RENDER_CARD_COUNT;

    // данные отсутствуют
    if (!this.filmsArray.length) return;

    
    // колличество существующих карточек
    const existingAmount = renderPlace.children.length;
    // Оставшееся колличество или RENDER_CARD_COUNT;
    const amountToRender = existingAmount + Math.min(this.renderCardCount, (filmsArray.length - existingAmount))
    
    // отрисовка карточек
    for (let i = existingAmount; i < amountToRender; i++) {
      const card = new FilmListCard(this.filmsArray[i])
      render(card, this.renderPlace);

      // Создание попапа и добавление по клику на film-card
      const popup = new PopupComponent(this.filmsArray[i]);
      // Обработчик закрытия попапа
      const removePopup = () => {
        // popup.removeClickHandler(removePopup)
        removeComponent(popup);
      };
      // Обработчик открытия попапа
      const showPopup = () => {
        render(popup, document.body)
        popup.setClickHandler(removePopup)
      }
      card.setClickHandler(showPopup)
    }
  }
}