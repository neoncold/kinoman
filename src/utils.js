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
  if (!element.element) {
    return
  }
  element.element.remove();
  element.removeElement();
}

const sortArrayByType = (type, array) => {
  const sliceOfArray = array.slice();
  switch (type) {
    case 'Sort by date':
      sliceOfArray.sort((a,b) => {
        return b.film_info.release.date - a.film_info.release.date
      });


    break;

    case 'Sort by rating':
      sliceOfArray.sort((a,b) => {
        return +((+b.film_info.totalRating - +a.film_info.totalRating).toFixed(1));
      });
    break;

    default:
      return array
  }
  return sliceOfArray;
}

const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export {getRandomInteger, generateContent, removeComponent, sortArrayByType, monthArray};