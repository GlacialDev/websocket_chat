'use strict'

const dropzoneLabel = document.querySelector('.load-img__dropzone-label');
const loadImg = document.querySelector('.load-img');
const loadImgButton = document.querySelectorAll('.load-img__button');
const loadImgInput = document.querySelector('#load_img');

let closeAndClearImageInput = function () {
  dropzoneLabel.style.backgroundImage = '';
  dropzoneLabel.innerText = 'Загрузить файл';
  // удаляем обработчик события отправки с кнопки
  loadImg.classList.remove('load-img--active');
  loadImgButton[1].classList.add('load-img__button--inactive');
  loadImgInput.value = '';
}

export default closeAndClearImageInput