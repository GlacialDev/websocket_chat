'use strict'

import previewImage from './../actions/previewImage';
import sendImageToServer from './../actions/sendImageToServer';

const dropzoneLabel = document.querySelector('.load-img__dropzone-label');
const loadImgButton = document.querySelectorAll('.load-img__button');

let initImageInputDnD = function (socket, _base64image) {
  let sendImageToServerWrapper = function () {
    sendImageToServer(socket, _base64image);
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzoneLabel.addEventListener(eventName, preventDefaults, false)
  })
  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  dropzoneLabel.addEventListener('drop', e => {
    let dt = e.dataTransfer
    let file = dt.files

    previewImage(file[0]).then(base64image => {
      // сохраняем картинку из промиса для того чтобы функция в обработчике могла её использовать
      _base64image = base64image;
      loadImgButton[1].classList.remove('load-img__button--inactive');
      loadImgButton[1].addEventListener('click', sendImageToServerWrapper, { once: true });
    });

    return false;
  })
}

export default initImageInputDnD