import ProfileButton from './view/profile-button.js';
import FooterStatistic from './view/footer-statistic.js';
import FilmListPresenter from './view/film-list-presenter.js';
import CardFilmModel from './model/card-film-model.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterStatisticContainer = document.querySelector('.footer__statistics');
const filmListPresenter = new FilmListPresenter();

const cardFilmModel = new CardFilmModel();
const dataArray = [...cardFilmModel.getCards()]

render(new ProfileButton(dataArray), siteHeaderElement);
filmListPresenter.init(siteMainElement, dataArray);
render(new FooterStatistic(dataArray.length), siteFooterStatisticContainer);


