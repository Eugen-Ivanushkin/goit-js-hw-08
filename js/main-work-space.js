import imagesContent from "./gallery-items.js";

const imagesContainer = document.querySelector('.js-gallery');
const imagesGallery = createImagesGallery(imagesContent);
const modal = document.querySelector('div.lightbox');
const modalContainer = document.querySelector('.lightbox__image');
const modalCloseButton = document.querySelector('.lightbox__button');
const overlayClose = document.querySelector('.lightbox__overlay');

imagesContainer.insertAdjacentHTML('beforeend', imagesGallery);

imagesContainer.addEventListener('click', onImagesContainerClick);

function createImagesGallery(imagesContent) {
  return imagesContent
    .map(({ preview, original, description }) => {
      return `
          <li class="gallery__item">
            <a
              class="gallery__link"
              href="${original}"
            >
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
          </li>
          `
    })
    .join('');
}

function onImagesContainerClick(evt) {

  evt.preventDefault();

  const imageGalleryEl = evt.target.classList.contains('gallery__image');
  if (!imageGalleryEl) {
    return;
  }
  const originalImagePath = evt.target.dataset.source;
  const originalImageAlt = evt.target.alt;

  setModalAttribute(originalImagePath, originalImageAlt);
  changeModalVisibility();

  addEventListenrOnCloseClick(true);
}

function addEventListenrOnCloseClick(open) {
  if (open) {
    modalCloseButton.addEventListener('click', onModalCloseClick);
    overlayClose.addEventListener('click', onModalCloseClick);
    window.addEventListener('keydown', onEscDown);
  }
  else {
    modalCloseButton.removeEventListener('click', onModalCloseClick);
    overlayClose.removeEventListener('click', onModalCloseClick);
    window.removeEventListener('keydown', onEscDown);
  }
}

function changeModalVisibility() {
  modal.classList.toggle('is-open');
}

function onModalCloseClick() {

  setModalAttribute("", "");

  addEventListenrOnCloseClick(false);

  changeModalVisibility();

}

function setModalAttribute(path, alt) {

  modalContainer.setAttribute('src', path);
  modalContainer.setAttribute('alt', alt);

}

function onEscDown(evt) {
  if (evt.code === 'Escape') {
    onModalCloseClick();
  }

}