import auth from './actions/auth';
import getUsersList from './actions/getUsersList';
import getUsersCount from './actions/getUsersCount';
import sendMessageFrom from './actions/sendMessageFrom';
import showNewMessage from './actions/showNewMessage';

const authButton = document.querySelector('.auth__button');
const nameField = document.querySelector('.welcome__text');
const image = document.querySelector('.welcome__photo');
const inputButton = document.querySelector('.input__button');
const socket = new WebSocket('ws://localhost:8080');

// 1) заходит чел, открывается сокет-соединение, он заполняет форму авторизации
// на сервер улетает сообщение с именем + никнеймом и спец. типом 'authorization'
// на сервере обработка под цифрой 2)
socket.onopen = function () {
  authButton.addEventListener('click', () => {
    let data = auth.getData();

    socket.send(JSON.stringify(data));
  });
  auth.switchView();
};

socket.onmessage = function (message) {
  message = JSON.parse(message.data);

  switch (message.type) {
    // 3) с сервера прилетает подтверждение что мол чел авторизовался, теперь на клиенте вешается
    // обработчик на кнопку инпута в результате чего чел теперь может писать в чат
    case 'authorized':
      auth.switchView();
      nameField.innerText = `${message.name} (${message.nickname})`;
      image.src = message.base64image;
      inputButton.addEventListener('click', () => sendMessageFrom(socket));
      break;
    case 'count':
      getUsersCount(message)
      break;
    case 'userlist':
      getUsersList(message)
      break;
    case 'chat':
      showNewMessage(message)
      break;
    default:
      break;
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onerror = function (error) {
  console.log('Ошибка ' + error.message);
};
