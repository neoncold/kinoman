import { generateMocks } from "../mock/generateMocks";

export default class CardFilmModel {
  cards = Array.from({length: 5}, generateMocks);
  
  getCards = () => this.cards;
}