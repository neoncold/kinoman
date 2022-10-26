import ProfileButton from './view/profile-button.js';
import FooterStatistic from './view/footer-statistic.js';
import FilmListPresenter from './view/film-list-presenter.js';
import {render} from './render.js';
import PopupPresenter from './view/popup-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticContainer = document.querySelector('.footer__statistics');
// const siteBody = document.querySelector('body');
const filmListPresenter = new FilmListPresenter();
// const popupPresenter = new PopupPresenter();

render(new ProfileButton(), siteHeaderElement);

filmListPresenter.init(siteMainElement);

render(new FooterStatistic(), siteFooterStatisticContainer);

// popupPresenter.init(siteBody);