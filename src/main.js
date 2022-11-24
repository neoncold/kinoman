import PagePresenter from './view/page-presenter.js';
import CardFilmModel from './model/card-film-model.js';

const siteMainElement = document.querySelector('.main');

const pagePresenter = new PagePresenter(siteMainElement);
const cardFilmModel = new CardFilmModel();
const filmsArray = [...cardFilmModel.getCards()]

pagePresenter.render(filmsArray);


