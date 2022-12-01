import { humanizeDate } from "../utils";
import Abstract from "./abstract";

export default class NewComment extends Abstract{
  constructor(comment) {
    super();
    this.comment = comment;
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this.comment.emotion}.png" width="55" height="55" alt="emoji-${this.comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${this.comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this.comment.author}</span>
        <span class="film-details__comment-day">${humanizeDate(this.comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`   
  }

  onDeleteButtonClick(handler) {
    this.getElement().querySelector('.film-details__comment-delete').addEventListener('click', handler)
  }
  
}