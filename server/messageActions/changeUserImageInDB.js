'use strict'

let changeUserImageInDB = function (db, socket, message) {
    db
        .get('users')
        .find({ nickname: socket.nickname })
        .assign({ base64image: message.base64image })
        .write();

    db
        .get('chatHistory')
        .value()
        .forEach(msg => {
            if (msg.nickname === socket.nickname) {
                msg.base64image = message.base64image
            }
        });

    let data = JSON.stringify({
        type: 'image_changed',
        base64image: message.base64image
    })

    socket.base64image = message.base64image;

    socket.send(data);
}

module.exports = changeUserImageInDB