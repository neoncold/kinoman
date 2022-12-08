document.querySelector('#content').innerHTML = '<ul class="testList"></ul><textarea class="testTextArea" style="display: block"placeholder="Введите сообщение"></textarea><button onClick="testSend()" class="testButton" style="display: block; border: 2px solid black">Отправить сообщение</button><button onClick="testUpdate()" class="testButton" style="display: block; border: 2px solid black">Обновить</button>';
const testList = document.querySelector('.testList');
const testRender = (comments) => {
  testList.innerHTML = '';
  comments.forEach((comment) => {
    const date = new Date(comment.date);
    testList.insertAdjacentHTML('beforeend', `<li>${date.toLocaleString()}</li><li style="font-size: 14px; list-style-type: none"><b>${comment.comment}</b></li>`);
  })
};
const testAuthor = 'illidan: ';
const testUpdate = () => {
  fetch('https://14.ecmascript.pages.academy/cinemaddict/comments/0', {method: 'GET', headers: {'Authorization': 'Basic eo0w590ik29889b', 'Content-Type': 'application/json'}}).then((response) => response.json())
  .then((data) => {
    document.querySelector('.testList').innerHTML = '';
    testRender(data);
  }).catch((err) => console.log(err))
};
const testSend = () => {
  const testTextArea = document.querySelector('.testTextArea');
  if (testTextArea.value) {
  const todayDate = new Date(Date.now());
    const testBody = {
      "comment": `${testAuthor}${testTextArea.value}`,
      "date": `${todayDate.toISOString()}`,
      "emotion": "smile",
    };
    testTextArea.value = '';
    fetch('https://14.ecmascript.pages.academy/cinemaddict/comments/0', {method: 'POST', headers: {'Authorization': 'Basic eo0w590ik29889b', 'Content-Type': 'application/json'}, body: JSON.stringify(testBody)}).then((response) => response.json())
    .then((data) => {
      testRender(data.comments);
    }).catch((err) => console.log(err));
  }
};
testUpdate();
