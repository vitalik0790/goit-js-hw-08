import pictures from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
gallery.insertAdjacentHTML('beforeend', createGalleryItem(pictures));

function createGalleryItem(pictures) {
    return pictures
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
    `;
        })
        .join('');
}

gallery.addEventListener('click', onGalleryClick);

const lightBox = document.querySelector('.lightbox');

const lightboxImage = document.querySelector('.lightbox__image');

const closeBth = document.querySelector('[data-action="close-lightbox"]');
closeBth.addEventListener('click', closeModal);

function openModal() {
    window.addEventListener('keydown', escPress);
    lightBox.classList.add('is-open');
}
function closeModal() {
    window.removeEventListener('keydown', escPress);
    lightBox.classList.remove('is-open');
}
function onGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    console.log(event.target.alt);
    lightboxImage.src = '';
    openModal();
    lightboxImage.src = event.target.dataset.source;
    lightboxImage.alt = event.target.alt;
}
function escPress(event) {
    const keyCode = 'Escape';
    const isEsc = event.code === keyCode;
    if (isEsc) {
        closeModal();
    }
}
const overLay = document.querySelector('.lightbox__overlay');
overLay.addEventListener('click', backDrop);
function backDrop(event) {
    if (event.currentTarget == event.target) {

        console.log("Клік в пустоту");
    }
}