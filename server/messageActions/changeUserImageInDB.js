'use strict'

let changeUserImageInDB = function (db, socket, message) {
    console.log('change');
    db
        .get('users')
        .find({ nickname: socket.nickname })
        .assign({ base64image: message.base64image })
        .write();

    let data = JSON.stringify({
        type: 'image_changed',
        base64image: message.base64image
    })

    socket.base64image = message.base64image;

    socket.send(data);
}

module.exports = changeUserImageInDB