'use strict'

let membersList = document.querySelector('.members__list');

let getUsersList = function (message) {
  let usersArray = message.userlist;

  membersList.innerHTML = '';

  for (let user of usersArray) {
    let li = document.createElement('li');

    li.classList.add('members__item');
    li.innerHTML = `<span class="members__name">${user.name} (${user.nickname})</span>`;

    membersList.appendChild(li)
  }
}

export default getUsersList