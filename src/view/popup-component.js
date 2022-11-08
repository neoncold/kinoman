import { createElement } from "../render";
import { monthArray } from "../utils.js"

// По тз, нужно создать все попапы паралельно карточкам и 
// навешивать обработчик для добавления и удаления попапа

export default class PopupComponent {
  constructor(cardData) {
    this.cardData = cardData;
  }

  
  renderComments(comments) {
    const sortedComments = comments.slice().sort((a,b) => a.date - b.date);

    return sortedComments.map((comment) => `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${new Date(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join(`\n`);
  }

  getGenres(genres) {
    return genres.split(" ").map((elem) => 
    `<span class="film-details__genre">${elem}</span>`)
    .join(`\n`);
  }

  getDate(date) {
    const dateObj = new Date(date);
    console.log(dateObj)
    return `${dateObj.getDate()} ${monthArray[dateObj.getMonth()]} ${dateObj.getFullYear()}`
  }

  getTemplate() {
    const cardData = this.cardData;
    return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${cardData.film_info.poster}" alt="">
  
          <p class="film-details__age">${cardData.film_info.age}+</p>
        </div>
  
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${cardData.film_info.title}</h3>
              <p class="film-details__title-original">${cardData.film_info.alternativeTitle}</p>
            </div>
  
            <div class="film-details__rating">
              <p class="film-details__total-rating">${cardData.film_info.totalRating}</p>
            </div>
          </div>
  
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${cardData.film_info.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${cardData.film_info.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${cardData.film_info.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this.getDate(cardData.film_info.release.date)}</td>
            </tr> 
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${cardData.film_info.runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${cardData.film_info.release.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${this.getGenres(this.cardData.film_info.genre)}
              </td>
            </tr>
          </table>
  
          <p class="film-details__film-description">
            ${cardData.film_info.description}
          </p>
        </div>
      </div>
  
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${cardData.user_details.inWatchedList ? "checked" : ""}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${cardData.user_details.alreadyWatched ? "checked" : ""}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${cardData.user_details.inWatchedList ? "checked" : ""}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${cardData.comments.length}</span></h3>
    
            <ul class="film-details__comments-list">
              ${this.renderComments(cardData.comments)}
            </ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
    `
    )
  }

  getElement() { 
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getCloseButton() {
    return this.getElement().querySelector('.film-details__close-btn');
  }

  setClickHandler(handler) {
    this.handler = handler;
    this.getCloseButton().addEventListener('click', this.handler)
  }

  // removeClickHandler() {
  //   this.getCloseButton.removeEventListener('click', this.handler);
  //   this.handler = null;
  // }

  removeElement() {
    this.element = null;
    
  }
}