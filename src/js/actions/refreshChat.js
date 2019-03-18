'use strict'

const chatMessageList = document.querySelector('.chat__message-list');

let refreshChat = function (message) {
  let chatHistory = chatMessageList.children;

  for (let element of chatHistory) {
    if (element.dataset.author === message.nickname) {
      element.querySelector('.message__img').src = message.base64image;
    }
  }
}

export default refreshChat