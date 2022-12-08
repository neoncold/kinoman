import { render } from "../render";
import Abstract from "./abstract";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { rankOfUser } from '../utils.js'
import { totalGenreAmount } from "../utils.js";



const createStatisticView = (films) => {
  const watchedFilms = films.filter((film) => film.user_details.alreadyWatched)
  const totalMinutes = watchedFilms.reduce((acc, curr) => acc + +curr.film_info.runtime, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes - (hours * 60));

  return `<section class="statistic visually-hidden">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rankOfUser(watchedFilms)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">Sci-fi</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
</section>`;
}


export default class StatisticView extends Abstract {
  constructor(container, model) {
    super();
    this.container = container;
    this.model = model;
    this.genreFilms;
  }
  getTemplate() {
   return createStatisticView(this.model.filmsList);
  }

  render() {
    render(this, this.container);
    this.renderChart();
  }
  

  renderChart() {
    const genreFilms = new Set(); 

    // заполняем genreFilms. жанры.
    for (let film of this.model.filmsList) {
      if (film.user_details.alreadyWatched) {
        for (let genre of film.film_info.genre) {
            genreFilms.add(genre);
        }
      }
    }

    this.genreFilms = [...genreFilms].map((elem) => {
      return {
        genre: elem,
        amount: totalGenreAmount(this.model.filmsList.filter((film) => film.user_details.alreadyWatched), elem),
      }
    }).sort((a, b) => b.amount - a.amount)
    
    this.genreFilms = this.genreFilms.slice(0, this.genreFilms.findIndex((genre) => genre.amount == 0))
    
    this.getElement().querySelectorAll('.statistic__text-item .statistic__item-text')[2].innerHTML = this.genreFilms.length ? this.genreFilms[0].genre : 0;

    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    // Обязательно рассчитайте высоту canvas, она
    // зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * this.genreFilms.length;
    // Рендер диаграммы
    const myChart = new Chart(statisticCtx, {
      type: `bar`,
      data: {
        labels: Array.from(this.genreFilms, (elem) => elem.genre),
        datasets: [{
          data: Array.from(this.genreFilms, (elem) => elem.amount),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: 'start',
            align: 'start',
            offset: 20,
          },
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
        },
        scales: {
          yAxes: {
            ticks: {
              fontColor: `#ffffff`,
              padding: 40,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          },
          xAxes: {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
    

  }
}