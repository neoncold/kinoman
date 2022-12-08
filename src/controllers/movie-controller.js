import { render } from "../render";
import { removeComponent } from "../utils";
import Abstract from "../view/abstract";
import FilmListCard from "../view/film-list-card";
import PopupComponent from "../view/popup-component";
import NewComment from "../view/comment";



export default class MovieController extends Abstract {
constructor(container, onDataChange, onViewChange, onDataCommentsChange, api) {
  super();
  this._container = container;
  this._onDataChange = onDataChange;
  this._onViewChange = onViewChange;
  this.card = null;
  this.film = null;
  this.popup = null;
  this.api = api;
  this.comments = null;
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
    const newFilm = Object.assign({}, this.film, {user_details: {
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: (clickedButton.classList.contains('film-card__controls-item--add-to-watchlist') ? !details.inWatchedList : details.inWatchedList),
      alreadyWatched: (clickedButton.classList.contains('film-card__controls-item--mark-as-watched') ? !details.alreadyWatched : details.alreadyWatched),
      favorite: (clickedButton.classList.contains('film-card__controls-item--favorite') ? !details.favorite : details.favorite)}
    })

    this.api.updateFilm(newFilm).then((film) => {
      this._onDataChange(this.film.id, film);
    }).catch((err) => alert(err))
  };

  //Обработчик клика по кнопкам контрола Попапа
  const popupControlClickHandler = () => {
    const controlButtons = this.popup.getElement().querySelectorAll('.film-details__control-input');
    const newFilm = Object.assign({}, this.film, {user_details: {
      watchedDate: this.film.user_details.watchedDate,
      inWatchedList: controlButtons[0].checked,
      alreadyWatched: controlButtons[1].checked,
      favorite: controlButtons[2].checked}}
    );
      this.api.updateFilm(newFilm).then((film) => {
        this._onDataChange(this.film.id, film);
      }).catch((err) => {
        this.popup.rerender();
        alert(err);
      })
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
    if (!this.popup.emoji) {
      alert('Выберите эмоцию');
      return
    };
    if (event.key == 'Enter' && event.target.value) {
      event.preventDefault();
      this.popup.getElement().classList.remove('shake')
      const target = event.target;
      // заблокировать форму 
      target.setAttribute('disabled', 'disabled');
      this.popup.commentMessage = event.target.value;
      const todayDate = new Date(Date.now());
      this.api.addComment(this.film.id, 
        {
          "comment": `${event.target.value}`,
          "date": `${todayDate.toISOString()}`,
          "emotion": `${this.popup.emoji}`,
         }
      ).then((response) => {
        this.film.comments = response.comments.map((comment) => comment.id);
        this.comments = '';
        this.popup.emoji = '';
        this.update(this.film)
      }).catch((err) => {
        // разблокировать форму
        this.popup.getElement().classList.add('shake');
        target.removeAttribute('disabled');
        alert(err);
      })
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
  this.commentsContainer = this.popup.getElement().querySelector('.film-details__comments-list');

  if (this.comments) {
    this.createComments();
  } else {
    this.api.getComments(this.film.id).then((comments) => {
      this.comments = comments;
      this.createComments();
      }).catch((err) => {
        alert('Ошибка загрузки комментариев');
      })
  }
}

createComments() {
  this.comments.forEach((currentComment) => {
    // создание экземпляра комментария
    const newComment = new NewComment(currentComment);
    // создание обработчика удаления коментария
    const onDeleteButtonClickHandler = () => {
    // индикация удалени комментария и блокировка повторной отправки
    event.target.innerHTML = 'Deleting...';
    event.target.setAttribute('disabled', 'disabled');

    // запрос за удаление комментария
    this.api.deleteComment(currentComment.id)
    .then(() => {
      const newFilm = Object.assign({}, this.film, {comments: this.film.comments.filter((elem) => elem != currentComment.id)})
      this.comments = this.comments.filter((comment) => comment.id != currentComment.id);
      this._onDataChange(this.film.id, newFilm);
      removeComponent(newComment);
    }).catch((err) => {
      newComment.rerender();
      alert(err);
    })};
    // Назначение обработчика
    newComment.onDeleteButtonClick(onDeleteButtonClickHandler);
    render(newComment, this.commentsContainer);
  });
}

update(newFilm = this.film) {
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