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
  if (!element._element) {
    return
  }
  element._element.remove();
  element.removeElement();
}

const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export {getRandomInteger, generateContent, removeComponent, monthArray};