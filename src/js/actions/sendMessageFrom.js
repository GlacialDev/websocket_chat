'use strict'

const inputTextfield = document.querySelector('.input__textfield');

let sendMessageFrom = function (socket) {
  let text = inputTextfield.value;

  if (text.trim() === '') {
    return
  }

  let data = JSON.stringify({
    type: 'chat',
    text: text
  })

  socket.send(data);

  inputTextfield.value = '';
}

export default sendMessageFrom