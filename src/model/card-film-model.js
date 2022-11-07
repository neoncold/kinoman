import { generateMocks } from "../mock/generateMocks";
import { AMOUNT_FILMS } from "../config.js";

export default class CardFilmModel {
  cards = Array.from({length: AMOUNT_FILMS}, generateMocks);
  
  getCards = () => this.cards;
}