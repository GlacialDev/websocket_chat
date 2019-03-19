'use strict'

import showNewMessage from './showNewMessage';

let getChatHistory = function (message) {
  message.chatHistory.forEach(msg => {
    showNewMessage(msg);
  });
}

export default getChatHistory