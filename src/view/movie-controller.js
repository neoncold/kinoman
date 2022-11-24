import { render } from "../render";
import { removeComponent } from "../utils";
import Abstract from "./abstract";
import FilmListCard from "./film-list-card";
import PopupComponent from "./popup-component";

export default class MovieController extends Abstract {
constructor(container, onDataChange, onViewChange) {
  super();
  this._container = container;
  this._onDataChange = onDataChange;
  this._onViewChange = onViewChange;
}

setDefaultView() {
  removeComponent(this.popup);
}

//карточка, показ попапа, закрытие попапа, обработчики
render(film) {
  this.film = film;
  this.card = new FilmListCard(this.film);

  //Обработчик клика по кнопкам Карточки фильма
  const filmControlClickHandler = () => {
    event.preventDefault();
    const buttonClassList = event.target.classList;
    const details = this.film.user_details;
    // визуальное изменение контролов карточки фильма
    buttonClassList.toggle('film-card__controls-item--active')

    this._onDataChange(this.film, Object.assign({}, this.film, {user_details: {
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: (buttonClassList.contains('film-card__controls-item--add-to-watchlist') ? !details.inWatchedList : details.inWatchedList),
      alreadyWatched: (buttonClassList.contains('film-card__controls-item--mark-as-watched') ? !details.alreadyWatched : details.alreadyWatched),
      favorite: (buttonClassList.contains('film-card__controls-item--favorite') ? !details.favorite : details.favorite)}})
    );
  };

  //Обработчик клика по кнопкам контрола Попапа
  const popupControlClickHandler = () => {
    const controlButtons = this.popup.getElement().querySelectorAll('.film-details__control-input');
    this._onDataChange(this.film, Object.assign({}, this.film, {user_details: {
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: controlButtons[0].checked,
      alreadyWatched: controlButtons[1].checked,
      favorite: controlButtons[2].checked}}));
  }

  //Обработчик клика по кнопкам Emoji попапа
  const emojiClickHandler = () => {
    this.popup.emoji = event.target.value;
    
    this.popup.rerender();
  }

  //Обработчик кнопки закрытия попапа
  const closePopupHandler = () => {
    removeComponent(this.popup);
  }

  //Обработчик клика по карточке фильма
  const filmClickHandler = () => {
    //Если нажимаем кнопки контролы на карточке фильма
    if (event.target.closest('.film-card__controls-item')) return;

    this._onViewChange();

    //Создание попапа
    this.popup = new PopupComponent(this.film);

    //Назначение обработчиков попапа
    this.popup.onCloseClick(closePopupHandler);
    this.popup.onClickEmoji(emojiClickHandler);
    this.popup.onPopupControlClick(popupControlClickHandler);
    //рендер попапа
    render(this.popup, document.body);
  };

  //Назначение обработчиков на карточку фильма
  this.card.onFilmCardControlClick(filmControlClickHandler);
  this.card.setClickHandler(filmClickHandler);
  //рендер карточки
  render(this.card, this._container);
}

updateComponents(newFilm) {
  this.film = newFilm;
  this.card.card = newFilm;
  
  this.card.rerender();

  if (this.popup) {
    this.popup.cardData = newFilm;
    this.popup.rerender();
  }
}
onFilmClick(handler = this._onFilmClickHandler) {
  this._onFilmClickHandler = handler;
  this.getElement().addEventListener('click', this._onFilmClick);
}
onAddToWatchlistClick(handler = this._onAddToWatchlistClickHandler) {
  this._onAddToWatchlistClickHandler = handler;
  this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._onAddToWatchlistClick)
}
onWatchedClick(handler = this._onWatchedClickHandler) {
  this._onWatchedClickHandler = handler;
  this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._onWatchedClick)
}
onFavoritClick(handler = this._onFavoriteClickHandler) {
  this._onFavoriteClickHandler = handler;
  this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._onFavoriteClick)
}
_subscribeOnEvents() {
  this.onFilmClick();
  this.onAddToWatchlistClick();
  this.onWatchedClick();
  this.onFavoritClick();
}
}