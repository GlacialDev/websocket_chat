'use strict'

let addNewUserInDB = function (db, message) {
    db
        .get('users')
        .push({
            nickname: message.nickname,
            base64image: message.base64image
        })
        .write()
}

module.exports = addNewUserInDB