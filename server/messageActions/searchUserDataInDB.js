'use strict'

let searchUserDataInDB = function (db, message) {
    let users = db.get('users').value();
    let isExistInDB = false

    for (let user in users) {
        if (users[user].nickname === message.nickname) {
            message.base64image = users[user].base64image;
            isExistInDB = true;
        }
    }

    return isExistInDB
}

module.exports = searchUserDataInDB