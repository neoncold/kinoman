import moment from "moment";

const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from,to));
  const upper = Math.floor(Math.max(from,to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateContent = (data, count = 1) => {
    
  const arr = [];
  let j;
  if (data.length < count) {
    count = data.length;
  }
  for (let i = 0; i < count; i++) {
    j = getRandomInteger(0,data.length - 1);

    if (!arr.includes(data[j])) {
      arr.push(data[j]);
    } else {
      i--;
    }
  }
  return arr.join(' ');
};

const removeComponent = (element) => {
  if (!element) return;
  if (!element._element) {
    return
  }
  element._element.remove();
  element.removeElement();
};

const formatDuration = (minutes, pattern = 'H:mm') => {
  const ms = Math.floor(minutes * 60000 - 10800000)
  return moment(ms).format(pattern)
};

const formatDate = (date) => {
  return moment(date).format('DD MMMM YYYY')
};

const humanizeDate = (date) => {
  const newDate = Date.now();
  const ms = newDate - Date.parse(date) + 10800000;
  return moment.duration(ms, 'milliseconds').humanize();
};

const FilterTypes = {
  DEFAULT: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortTypes = {
  DEFAULT: 'default',
  DATE: 'byDate',
  RATING: 'byRating',
};

const rankOfUser = (arr) => {
  const count = arr.reduce((acc,curr) => 
  curr.user_details.alreadyWatched ? ++acc : acc, 0);
  let rank;
  
  count === 0 ? rank = "" :
  count <= 10 ? rank = "novice" :
  count <= 20 ? rank = "fan" : 
                rank = "movie buff";
    
  return rank;
};

const totalGenreAmount = (films, genre) => {
  return films.reduce((acc, film) => film.film_info.genre.includes(genre) ? ++acc : acc, 0)
}

const createGenres = (genresArray) => {
  return genresArray.map((genre) => {
    return `<span class="film-card__genre">${genre}</span>`
  }).join('\n');
}


export {
  getRandomInteger, 
  generateContent, 
  removeComponent, 
  formatDuration, 
  formatDate, 
  humanizeDate, 
  FilterTypes, 
  SortTypes,
  rankOfUser,
  totalGenreAmount,
  createGenres
};