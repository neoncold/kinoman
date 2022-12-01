import { FilterTypes } from "../utils";
import { SortTypes } from "../utils";


export default class Movies {
  constructor() {
    this._activeFilterType = FilterTypes.DEFAULT;
    this._activeSortType = SortTypes.DEFAULT;
    this._filmsList = null;
    this._filterAndSortHandler = null;
    this._updateFilterHandler = null;
  }

  getFilms() {
    let films = this._filmsList.slice();

    // Фильтрация по активному типу фильтра и сортировка
    switch(this._activeFilterType) {
      case FilterTypes.DEFAULT:
        this._sortFilms(films);
      break;
      case FilterTypes.WATCHLIST:
        films = films.filter((film) => film.user_details.inWatchedList);
        this._sortFilms(films);
      break;
      case FilterTypes.HISTORY:
        films = films.filter((film) => film.user_details.alreadyWatched);
        this._sortFilms(films);
      break;
      case FilterTypes.FAVORITES:
        films = films.filter((film) => film.user_details.favorite);
        this._sortFilms(films);
      break;
    }
    return films;
  }

  

  set filmsList(filmsList) {
    this._filmsList = filmsList;
  }

  get filmsList() {
    return this._filmsList;
  }

  _sortFilms(films) {
    switch (this._activeSortType) {
      case SortTypes.DEFAULT:
        films.sort((a,b) => this._filmsList.indexOf(a) - this._filmsList.indexOf(b));
      break;
      case SortTypes.DATE:
        films.sort((a,b) => Date.parse(b.film_info.release.date) - Date.parse(a.film_info.release.date));
      break;
      case SortTypes.RATING:
        films.sort((a,b) => (+b.film_info.totalRating - +a.film_info.totalRating).toFixed(1));    
      break;
    }
  }

  set activeFilterType(filterType) {
    this._activeFilterType = filterType;
    this.activateFilterAndSort();
  }
  
  set activeSortType(sortType) {
    this._activeSortType = sortType;
    this.activateFilterAndSort();
  }
  
  activateFilterAndSort() {
    this._filterAndSortHandler();
  }

  setFilterAndSortHandler(handler) {
    this._filterAndSortHandler = handler;
  }

  setUpdateFilter(handler = this._updateFilterHandler) {
    this._updateFilterHandler = handler;
  }
  setUpdateFilmList(handler = this._updateFilmListrHandler) {
    this._updateFilmListHandler = handler;
  }


  
  updateFilm(id, newData) {
    const index = this._filmsList.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      this._filmsList[index] = newData;

      // сигнал к перерисовке фильтров
      this._updateFilterHandler();
      // this._updateFilmList();
    }
  } 
}