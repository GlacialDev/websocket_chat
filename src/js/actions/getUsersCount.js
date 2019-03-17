'use strict'

const membersCount = document.querySelector('.members__count');

let getUsersCount = function (message) {
  membersCount.innerText = message.count;
}

export default getUsersCount