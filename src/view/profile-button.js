import {createElement} from '../render.js';

let count;

const numberOfAlreadyWatched = (arr) => {
  if (count) return count;
  count = arr.reduce((acc,curr) => 
  curr.user_details.alreadyWatched ? ++acc : acc, 0)
  
  return count;
}
const createProfileButton = (cardsArray) => (
  `<section class="header__profile profile">
  <p class="profile__rating">${
    numberOfAlreadyWatched(cardsArray) === 0 ? "" :
    numberOfAlreadyWatched(cardsArray) <= 10 ? "novice" :
    numberOfAlreadyWatched(cardsArray) <= 20 ? "fan" :
                                               "movie buff"
    
    }
  </p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileButton {
  constructor(cardsArray) {
    this.cardsArray = cardsArray;
  }
  getTemplate() {
    return createProfileButton(this.cardsArray);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
};