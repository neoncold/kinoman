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

export {getRandomInteger, generateContent};