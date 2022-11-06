import { getRandomInteger, generateContent } from "../utils.js";

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
    genre: ["Comedy","Western",],
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
  id: '',
  author: "fan",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "1667403151171",
  emotion: "smile",
},{
  id: '',
  author: "hater",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "1667403143404",
  emotion: "angry",
},{
  id: '',
  author: "jesus",
  comment: "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
  date: "1667403114940",
  emotion: "sleeping",
}];

export const generateMocks = (count) => {

  return {
    id: getRandomInteger(0, 10),
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
        date: getRandomInteger(0, Date.now()),
      }, 
      runtime: `${getRandomInteger(1,2)}h ${getRandomInteger(0,59)}m`,
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