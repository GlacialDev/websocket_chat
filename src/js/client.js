'use strict'

import auth from './actions/auth';
import getUsersList from './actions/getUsersList';
import getUsersCount from './actions/getUsersCount';
import sendMessageFrom from './actions/sendMessageFrom';
import showNewMessage from './actions/showNewMessage';

const authButton = document.querySelector('.auth__button');
const nameField = document.querySelector('.welcome__text');
const image = document.querySelector('.welcome__photo');
const loadImg = document.querySelector('.load-img');
const loadImgButton = document.querySelectorAll('.load-img__button');
const inputButton = document.querySelector('.input__button');
const inputTextField = document.querySelector('.input__textfield');
const socket = new WebSocket('ws://localhost:8080');
// const chatMessageList = document.querySelector('.chat__message-list');

// 1) заходит чел, открывается сокет-соединение, он заполняет форму авторизации
// на сервер улетает сообщение с именем + никнеймом и спец. типом 'authorization'
// на сервере обработка под цифрой 2)
socket.onopen = () => {
  authButton.addEventListener('click', () => {
    let data = auth.getData();

    socket.send(JSON.stringify(data));
  });
  auth.switchView();
};

socket.onmessage = (message) => {
  message = JSON.parse(message.data);

  switch (message.type) {
    // 3) с сервера прилетает подтверждение что мол чел авторизовался, теперь на клиенте вешается
    // обработчики событий на интерфейс: инпут, загрузку фотки и т.д.
    case 'authorized':
      auth.switchView();
      nameField.innerText = `${message.name} (${message.nickname})`;
      image.src = message.base64image;
      inputButton.addEventListener('click', () => sendMessageFrom(socket));
      inputTextField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          // на шифт энтер можно жать энтер для перевода строки, без шифта отправляем сообщение
          if (!e.shiftKey) {
            sendMessageFrom(socket)
            // запрещаем по отправке сообщения ускакивать энтеру на 2 строку
            e.preventDefault();
          }
        }
      });
      image.addEventListener('click', () => loadImg.classList.toggle('load-img--active'));
      loadImgButton[0].addEventListener('click', () => loadImg.classList.toggle('load-img--active'));
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

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onerror = (error) => {
  console.log('Ошибка ' + error.message);
};
