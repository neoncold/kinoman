import Adapter from "./adapter";

const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(authorization, url) {
    this.url = url;
    this._authorization = authorization;
    this.adapter = new Adapter();
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    return response;
  }

  static fromJSON(response) {
    return response.json();
  }

  static toJSON(response) {
    return JSON.stringify(response);
  }

  static catchError(err) {
    throw err;
  }

  _load({url, method = Methods.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this.url}/${url}`, {method, headers, body}).then(Api.checkStatus).catch(Api.catchError)
  }

  getFilms() {
    return this._load({url: 'movies'})
           .then(Api.fromJSON)
           .then((films) => films.map((film) => this.adapter.parse(film)));
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.fromJSON)
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`, 
      method: Methods.PUT, 
      headers: new Headers({'Content-Type': 'application/json'}), 
      body: Api.toJSON(this.adapter.stringify(film))})
    .then(Api.fromJSON).then((film) => this.adapter.parse(film))
  }

  addComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Methods.POST,
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(comment),
  })
    .then(Api.fromJSON);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Methods.DELETE,
    })
  }
}