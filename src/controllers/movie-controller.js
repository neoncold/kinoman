import { render } from "../render";
import { removeComponent } from "../utils";
import Abstract from "../view/abstract";
import FilmListCard from "../view/film-list-card";
import PopupComponent from "../view/popup-component";
import NewComment from "../view/comment";



export default class MovieController extends Abstract {
constructor(container, onDataChange, onViewChange, onDataCommentsChange) {
  super();
  this._container = container;
  this._onDataChange = onDataChange;
  this._onViewChange = onViewChange;
  this.card = null;
  this.film = null;
  this.popup = null;
}

setDefaultView() {
  removeComponent(this.popup);
}

//карточка, показ попапа, закрытие попапа, обработчики
render(film) {
  this.film = film;
  this.card = new FilmListCard(this.film);
  
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
    this.popup.onTyppingNewMessage(typpingHandler);

    // Рендер комментариев
    this.renderComments();

    //рендер попапа
    render(this.popup, document.body);
  };

  //Обработчик клика по кнопкам Карточки фильма
  const filmControlClickHandler = () => {
    event.preventDefault();
    const clickedButton = event.target.closest('.film-card__controls-item');

    if (!clickedButton) return;
    
    const details = this.film.user_details;
    // визуальное изменение контролов карточки фильма
    clickedButton.classList.toggle('film-card__controls-item--active')

    this._onDataChange(this.film.id, Object.assign({}, this.film, {user_details: {
      
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: (clickedButton.classList.contains('film-card__controls-item--add-to-watchlist') ? !details.inWatchedList : details.inWatchedList),
      alreadyWatched: (clickedButton.classList.contains('film-card__controls-item--mark-as-watched') ? !details.alreadyWatched : details.alreadyWatched),
      favorite: (clickedButton.classList.contains('film-card__controls-item--favorite') ? !details.favorite : details.favorite)}})
    );
  };

  //Обработчик клика по кнопкам контрола Попапа
  const popupControlClickHandler = () => {
    const controlButtons = this.popup.getElement().querySelectorAll('.film-details__control-input');
    this._onDataChange(this.film.id, Object.assign({}, this.film, {user_details: {
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: controlButtons[0].checked,
      alreadyWatched: controlButtons[1].checked,
      favorite: controlButtons[2].checked}}));
  }

  //Обработчик клика по кнопкам Emoji попапа
  const emojiClickHandler = () => {
    // проверка на повторное нажатие
    if (event.target.value == this.popup.emoji) return;

    // Значение выбранной emoji
    this.popup.emoji = event.target.value;
    
    this.popup.rerender();
    this.renderComments();
  }

  const typpingHandler = () => {
    if (event.key == 'Enter' && event.target.value) {
      event.preventDefault();
      this.popup.commentMessage = event.target.value;
      console.log(this.popup.commentMessage)
      event.target.value = '';
    }
    return
  }

  //Обработчик кнопки закрытия попапа
  const closePopupHandler = () => {
    removeComponent(this.popup);
    this.popup.commentMessage = '';
  }  

  //Назначение обработчиков на карточку фильма
  this.card.onFilmCardControlClick(filmControlClickHandler);
  this.card.setClickHandler(filmClickHandler);
  //рендер карточки
  render(this.card, this._container);
}

// функция по отрисовке комментов
renderComments() {
  const container = this.popup.getElement().querySelector('.film-details__comments-list');
  this.film.comments.forEach((currentComment) => {
    // создание экземпляра комментария
    const newComment = new NewComment(currentComment);
    // создание обработчика удаления коментария
    const onDeleteButtonClickHandler = () => {
    this._onDataChange(this.film.id, Object.assign({}, this.film, {
      comments: this.film.comments.filter((elem) => !(elem.id == newComment.comment.id))
    }));
    removeComponent(newComment);
    };
    // Назначение обработчика
    newComment.onDeleteButtonClick(onDeleteButtonClickHandler);
    render(newComment, container);
  })
}

update(newFilm) {
  this.film = newFilm;
  this.card.card = newFilm;
  
  this.card.rerender();

  if (this.popup) {
    this.popup.cardData = newFilm;
    this.popup.rerender();
    this.renderComments();
  }
}
}