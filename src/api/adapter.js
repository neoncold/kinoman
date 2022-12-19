
export default class Adapter {

  parse(film) {
    return {
      id: film.id,
      comments: film.comments,
      film_info: {
        age: film.film_info.age_rating,
        poster: film.film_info.poster,
        title: film.film_info.title,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        runtime: film.film_info.runtime,
        genre: film.film_info.genre,
        description: film.film_info.description,
        release: {
          country: film.film_info.release.release_country,
          date: film.film_info.release.date,
        },
      },
      user_details: {
        watchedDate: film.user_details.watching_date,
        inWatchedList: film.user_details.watchlist,
        alreadyWatched: film.user_details.already_watched,
        favorite: film.user_details.favorite,
      },
    }
  }

  stringify(film) {
    return {
      id: film.id,
      comments: film.comments,
      film_info: {
        age_rating: film.film_info.age,
        poster: film.film_info.poster,
        title: film.film_info.title,
        alternative_title: film.film_info.alternativeTitle,
        total_rating: film.film_info.totalRating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        runtime: film.film_info.runtime,
        genre: film.film_info.genre,
        description: film.film_info.description,
        release: {
          release_country: film.film_info.release.country,
          date: film.film_info.release.date,
        },
      },
      user_details: {
        watching_date: film.user_details.watchedDate,
        watchlist: film.user_details.inWatchedList,
        already_watched: film.user_details.alreadyWatched,
        favorite: film.user_details.favorite,
      },
    }
  }
}