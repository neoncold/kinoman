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

const formatDuration = (minutes) => {
  const ms = Math.floor(minutes * 60000 - 10800000)
  return moment(ms).format('H:mm')
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



export {
  getRandomInteger, 
  generateContent, 
  removeComponent, 
  formatDuration, 
  formatDate, 
  humanizeDate, 
  FilterTypes, 
  SortTypes,
};