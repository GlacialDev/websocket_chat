'use strict'

const chatMessageList = document.querySelector('.chat__message-list');

let showNewMessage = function (message) {
  let li = document.createElement('li');

  li.classList.add('chat__message');
  li.classList.add('message');
  li.dataset.author = message.nickname;

  li.innerHTML = `
  <img class="message__img" src="${message.base64image}"></img>
  <div class="message__content">
    <div class="message__author">
      <span class="message__name">${message.name} (${message.nickname})</span>
      <span class="message__time">${message.time}</span>
    </div>
    <div class="message__text">${message.text}</div>
  </div>
`;

  chatMessageList.appendChild(li);
}

export default showNewMessage