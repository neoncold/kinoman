import Abstract from './abstract.js';
import { rankOfUser } from '../utils.js';

const createProfileButton = (cardsArray) => (
  `<section class="header__profile profile">
  <p class="profile__rating">${rankOfUser(cardsArray)}
  </p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileButton extends Abstract {
  constructor(cardsArray) {
    super();
    this.cardsArray = cardsArray;
  }
  getTemplate() {
    return createProfileButton(this.cardsArray);
  }
  update(films) {
    this.cardsArray = films;
    this.rerender();
  }
};