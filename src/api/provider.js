
export default class Provider {
  constructor(api, store) {
    this.api = api;
    this.store = store;
    this.modelChanged = false;
  }

  syncApplication() {
    if (this.needToSync()) {
      // передаём изменённые данные для синхронизации
      this.api.syncApplication(this.store.getFilms())
      .then((response) => {
        // возможно нужно обновить и модель
        this.store.setFilms(response);
      })
      .then(() => this.modelChanged = false)
      .catch((err) => console.log(new Error(err)));
    }
  }

  needToSync() {
    return this.modelChanged;
  }

  _isOnline() {
    return navigator.onLine;
  }

  getFilms() {
    if (this._isOnline()) {
      return this.api.getFilms().then((films) => this.store.setFilms(films))
    } else {
      return Promise.resolve(this.store.getFilms());
    }
  }

  getComments(filmId) {
    if (this._isOnline()) {
      return this.api.getComments(filmId);
    } else {
      return Promise.reject('Ошибка загрузки комментариев')
    }
  }

  updateFilm(film) {
    if (this._isOnline()) {
      return this.api.updateFilm(film);
    } else {
      this.modelChanged = true;
      return Promise.resolve(this.store.updateFilm(film))
    }
  }

  addComment(filmId, comment) {
    if (this._isOnline()) {
      return this.api.addComment(filmId, comment);
    } else {
      return Promise.reject('Невозможно добавить комментарий в offline режиме')
    }
  }

  deleteComment(commentId) {
    if (this._isOnline()) {
      return this.api.deleteComment(commentId).then(() => this.store.deleteComment(commentId));
    } else {

      // удаление не работает по стандартной синхронизации,
      // каждый коммент нужно удалять очередью запросов

      // return Promise.resolve(this.store.deleteComment(commentId))
      // .then(() => this.modelChanged = true);
      return Promise.reject('Не удалось удалить комментарий в offline режиме')
    }
  }

  static checkStatus(response) {
    return this.api.checkStatus(response);
  }

  static fromJSON(response) {
    return this.api.fromJSON(response);
  }

  static toJSON(response) {
    return this.api.toJSON(response);
  }

  static catchError(err) {
    throw err;
  }
}