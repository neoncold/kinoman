import ProfileButton from './view/profile-button.js';
import FooterStatistic from './view/footer-statistic.js';
import PagePresenter from './view/page-presenter.js';
import CardFilmModel from './model/card-film-model.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticContainer = document.querySelector('.footer__statistics');

const pagePresenter = new PagePresenter();
const cardFilmModel = new CardFilmModel();
const filmsArray = [...cardFilmModel.getCards()]

render(new ProfileButton(filmsArray), siteHeaderElement);
pagePresenter.init(siteMainElement, filmsArray);
render(new FooterStatistic(filmsArray.length), siteFooterStatisticContainer);


