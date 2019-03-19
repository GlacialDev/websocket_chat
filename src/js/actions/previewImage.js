'use strict'

// const loadImgInput = document.querySelector('#load_img');
const dropzoneLabel = document.querySelector('.load-img__dropzone-label');
const errorAlert = document.querySelector('.load-img__alert');

let previewImage = function (file) {
  return new Promise((resolve, reject) => {
    if (file.size <= 512 * 1024) {
      errorAlert.style.opacity = 0;
      renderImage(file).then(base64image => resolve(base64image));
    } else {
      errorAlert.style.opacity = 1;
      reject();
    }
  })
}

// рендеринг изображения
function renderImage(file) {
  return new Promise((resolve) => {
    let base64image = '';
    // генерируем новый объект FileReader
    var reader = new FileReader();

    // по загрузке ридер должен вернуть base64 строку картинки
    // а также отобразить её в инпуте
    reader.onload = function (event) {
      base64image = event.target.result;

      dropzoneLabel.style.backgroundImage = `url(${base64image})`;
      dropzoneLabel.innerText = ''

      resolve(base64image)
    }
    // когда файл считывается он запускает событие OnLoad.
    reader.readAsDataURL(file)
  })
}

export default previewImage