import { generateMocks } from "../mock/generateMocks";

export default class CardFilmModel {
  cards = Array.from({length: 11}, generateMocks);
  
  getCards = () => this.cards;
}