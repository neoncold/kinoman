import PageController from './controllers/page-controller.js';
import Movies from './model/movies.js';
import { AMOUNT_FILMS } from './config.js';
import { generateMocks } from './mock/generateMocks.js';
import FilterController from './controllers/filter-controller.js';

const siteMainElement = document.querySelector('.main');
const cards = Array.from({length: AMOUNT_FILMS}, generateMocks);

const movies = new Movies();
movies.filmsList = cards;

const filterController = new FilterController(siteMainElement, movies);
const pageController = new PageController(siteMainElement, movies);

filterController.render();
pageController.render();

