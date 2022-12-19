
export default class Store {
  constructor(key, localStorage) {
    this.key = key;
    this.localStorage = localStorage;
  }

getFilms() {
  return JSON.parse(this.localStorage.getItem(this.key)) || {};
}

setFilms(films) {
  this.localStorage.setItem(this.key, JSON.stringify(films))
  return films;
}

updateFilm(film) {
  const filmsArray = this.getFilms();
  const index = filmsArray.findIndex((elem) => elem.id === film.id);
  filmsArray[index] = film;
  this.setFilms(filmsArray);
  return filmsArray[index];
}

deleteComment(commentId) {
  debugger
  const filmsArray = this.getFilms();
  const index = filmsArray.findIndex((elem) => elem.comments.includes(commentId));
  filmsArray[index].comments = filmsArray[index].comments.filter((id) => id !== commentId)
  this.setFilms(filmsArray);
  return;
}
}

