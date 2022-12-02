import PageController from './controllers/page-controller.js';
import Movies from './model/movies.js';
import { AMOUNT_FILMS } from './config.js';
import { generateMocks } from './mock/generateMocks.js';
import FilterController from './controllers/filter-controller.js';
import StatisticView from './view/statistic-view.js';

const siteMainElement = document.querySelector('.main');
const cards = Array.from({length: AMOUNT_FILMS}, generateMocks);

const movies = new Movies();
movies.filmsList = cards;

const filterController = new FilterController(siteMainElement, movies);
const statisticView = new StatisticView(siteMainElement, movies);
const pageController = new PageController(siteMainElement, movies);

filterController.render();
statisticView.render();
pageController.render();

const swapPages = () => {
  const clickedButton = event.target.closest('a');
  if (!clickedButton) return;
  
  if (clickedButton.classList.contains('main-navigation__additional')) {
    pageController.hide();
    statisticView.show();
    return;
  } else {
    statisticView.hide();
    pageController.show();
  }
}

filterController.onSwapPages(swapPages);

