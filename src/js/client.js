'use strict'

import auth from './actions/auth';
import getUsersList from './actions/getUsersList';
import getUsersCount from './actions/getUsersCount';
import sendMessageFrom from './actions/sendMessageFrom';
import showNewMessage from './actions/showNewMessage';
import previewImage from './actions/previewImage';
import sendImageToServer from './actions/sendImageToServer';
import refreshChat from './actions/refreshChat';

const authButton = document.querySelector('.auth__button');
const nameField = document.querySelector('.welcome__text');
const image = document.querySelector('.welcome__photo');
const loadImg = document.querySelector('.load-img');
const loadImgButton = document.querySelectorAll('.load-img__button');
const loadImgInput = document.querySelector('#load_img');
const inputButton = document.querySelector('.input__button');
const inputTextField = document.querySelector('.input__textfield');
const dropzoneLabel = document.querySelector('.load-img__dropzone-label');
const socket = new WebSocket('ws://localhost:8080');

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
      loadImgInput.addEventListener('change', () => {
        // если показали превьюху на инпуте загрузки картинки то картинка удовлетворяет требованиям
        // в этом случае вешаем обработчик клика на кнопку отправки на сервер
        // мы удалим его когда придет ответ от сервера что мол ок я поменял
        previewImage().then(base64image => {
          loadImgButton[1].classList.remove('load-img__button--inactive');
          loadImgButton[1].addEventListener('click', send(base64image));
        })
      });
      break;
    case 'count':
      getUsersCount(message);
      break;
    case 'userlist':
      getUsersList(message);
      break;
    case 'chat':
      showNewMessage(message);
      break;
    case 'image_changed':
      dropzoneLabel.style.backgroundImage = '';
      dropzoneLabel.innerText = 'Загрузить файл';
      // удаляем обработчик события отправки с кнопки
      loadImgButton[1].removeEventListener('click', send);
      loadImgButton[1].classList.add('load-img__button--inactive');
      loadImg.classList.remove('load-img--active');
      image.src = message.base64image;
      break;
    case 'client_change_image':
      refreshChat(message)
      break;
    default:
      break;
  }

  // обертка над функцией отправки на сервер нужна для того чтобы
  // можно было вешать и удалять обработчик события клика по кнопке загрузить на сервер
  let send = function (base64image) {
    sendImageToServer(socket, base64image)
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
