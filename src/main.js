import PageController from './controllers/page-controller.js';
import Movies from './model/movies.js';
import FilterController from './controllers/filter-controller.js';
import StatisticView from './view/statistic-view.js';
import Api from './api/api.js';
import Provider from './api/provider.js';
import Store from './api/store.js';

// доделать провайдер, пока только кеширование фильмов
// нужно придумать метод синхронизации после появления сети
// фильм умеет обновляться оффлайн, нужно только послать 
// онлайн запрос в виде массива данных или сразу весь список
// фильмов


if ('serviceWorker' in navigator ) {
  navigator.serviceWorker.register('./sw.js')
  .then(() => navigator.serviceWorker.ready.then((worker) => {
    worker.sync.register('syncdata');
  }))
  .catch((err) => console.log(err));

}

const siteMainElement = document.querySelector('.main');

const authorization = 'Basic eo0w590ik29889b';
const url = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(authorization, url);
const store = new Store('cinemaaddict-storage', window.localStorage);
const provider = new Provider(api, store);


const renderPage = (films = []) => {
  const movies = new Movies(films);
  siteMainElement.innerHTML = '';
  const filterController = new FilterController(siteMainElement, movies);
  const statisticView = new StatisticView(siteMainElement, movies);
  const pageController = new PageController(siteMainElement, movies, provider);
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
provider.getFilms().then((films) => {
  renderPage(films);
}).catch(() => {
  renderPage();
})

const title = document.title;

window.addEventListener('offline', () => {
  document.title = title + '[offline]';
});

window.addEventListener('online', () => {
  document.title = title;
  provider.syncApplication();
});

