'use strict'

let sendImageToServer = function (socket, base64image) {
  console.log('send');

  let data = JSON.stringify({
    type: 'change_image',
    base64image: base64image
  })

  socket.send(data);
}

export default sendImageToServer