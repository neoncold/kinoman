import PageController from './controllers/page-controller.js';
import Movies from './model/movies.js';
// import { AMOUNT_FILMS } from './config.js';
// import { generateMocks } from './mock/generateMocks.js';
import FilterController from './controllers/filter-controller.js';
import StatisticView from './view/statistic-view.js';
import Api from './api.js';

const siteMainElement = document.querySelector('.main');
// const cards = Array.from({length: AMOUNT_FILMS}, generateMocks);

const authorization = 'Basic eo0w590ik29889b';
const url = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(authorization, url);

// нужно реализовать поведение на случай ошибки получения
// комметариев
// 0) чтобы не сьезжало окно после ререндера
// 1) сломались контролы попапа
const renderPage = (films = []) => {
  const movies = new Movies(films);
  siteMainElement.innerHTML = '';
  const filterController = new FilterController(siteMainElement, movies);
  const statisticView = new StatisticView(siteMainElement, movies);
  const pageController = new PageController(siteMainElement, movies, api);
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
}

api.getFilms().then((films) => {
  renderPage(films);
}).catch(() => {
  renderPage();
})