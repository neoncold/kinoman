import { getRandomInteger, generateContent } from "../utils.js";

export const genres = ["Comedy","Western","Sci-fi", "Animation", "Fantasy", "TV Series"];

const mocksData = {
  // id: '',
  comments: [],
  film_info: {
    poster: ["made-for-each-other.png","popeye-meets-sinbad.png","sagebrush-trail.jpg","santa-claus-conquers-the-martians.jpg","the-dance-of-life.jpg","the-great-flamarion.jpg","the-man-with-the-golden-arm.jpg"],
    title: ["A Little Pony Without The Carpet","Sagebrush Trail"],
    alternativeTitle: ["Laziness Who Sold Themselves",],
    //totalRating: '',
    director: ["Tom Ford",],
    writers: ["Takeshi Kitano",],
    actors: ["Morgan Freeman",],
    release:  {
      // date: '',
      country: ["Finland",],
    },
    //runtime: '',
    genre: genres,
    description: [
      "Lorem ipsum dolor sit amet.",
      "consectetur adipiscing elit.", "Cras aliquet varius magna",
      "non porta ligula feugiat eget.",
      "Fusce tristique felis at fermentum pharetra.",
      "Aliquam id orci ut lectus varius",
      "viverra. Nullam nunc ex, convallis sed",
    ],
  },
  user_details: {
    inWatchedList: false,
    alreadyWatched: false,
    watchedDate: ["2019-04-12T16:12:32.554Z",],
    favorite: false,
  }, 
};

// const comments = {
//   id: '',
//   author: ["Ilya O'Reilly",],
//   comment: ["a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",],
//   date: ["2019-05-11T16:12:32.554Z","2019-05-11T00:00:00.000Z",],
//   emotion: ["smile", "sleeping", "puke", "angry"],
// };


const comments = [{
  id: '0',
  author: "fan",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "2019-05-11T16:12:32.554Z",
  emotion: "smile",
},{
  id: '1',
  author: "hater",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "2020-05-11T16:12:32.554Z",
  emotion: "angry",
},{
  id: '2',
  author: "jesus",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "2022-11-24T15:40:32.554Z",
  emotion: "sleeping",
}];

let currentId = 1;

const releases = ["2011-05-11T00:00:00.000Z","2012-05-11T00:00:00.000Z","2013-05-11T00:00:00.000Z","2014-05-11T00:00:00.000Z","2015-05-11T00:00:00.000Z","2016-05-11T00:00:00.000Z"]

export const generateMocks = (count) => {

  return {
    id: currentId++,
    comments: comments,
    film_info: {
      age: `${getRandomInteger(0,18)}`,
      poster: generateContent(mocksData.film_info.poster, 1),
      title: generateContent(mocksData.film_info.title),
      alternativeTitle: generateContent(mocksData.film_info.alternativeTitle),
      totalRating: `${getRandomInteger(0,9)}.${getRandomInteger(0,9)}`,
      director: generateContent(mocksData.film_info.director),
      writers: generateContent(mocksData.film_info.writers, getRandomInteger(1,3)),
      actors: generateContent(mocksData.film_info.actors, getRandomInteger(1,3)),
      release:  {
        country: generateContent(mocksData.film_info.release.country),
        date: generateContent(releases, 1),
      }, 
      runtime: `${getRandomInteger(50, 120)}`,
      genre: generateContent(mocksData.film_info.genre, getRandomInteger(1,3)),
      description: generateContent(mocksData.film_info.description, getRandomInteger(1,5)),
    },
    user_details: {
      watchedDate: getRandomInteger(0, Date.now()),
      inWatchedList: getRandomInteger(),
      alreadyWatched: getRandomInteger(),
      favorite: getRandomInteger(),
    }, 
  };
}