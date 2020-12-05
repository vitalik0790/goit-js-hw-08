import galleryItems from './gallery-items.js';

const galleryUl = document.querySelector('.js-gallery');
const openModal = document.querySelector('.js-lightbox');
const closeModal = document.querySelector('button[data-action="close-lightbox"]');
const imgModal = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');
let imgIndex;

function createList(galleryItems) {
    const itemLi = galleryItems.reduce((acc, { preview, original, description }, index) => {
        acc += `<li class="gallery__item"><a
        class="gallery__link"
        href=${original}
    >
        <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            data-index=${index}
            alt=${description}
        />
    </a></li>`
        return acc
    }, '');
    return itemLi;
}

galleryUl.insertAdjacentHTML("afterbegin", createList(galleryItems));

galleryUl.addEventListener('click', galleryOnClick)

function galleryOnClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    openModal.classList.add('is-open');
    closeModal.addEventListener('click', closeWindow);
    overlay.addEventListener('click', overlayClose)
    window.addEventListener('keydown', onPressKey)

    imgModal.src = event.target.dataset.source;
    imgModal.alt = event.target.description;

    imgIndex = Number(event.target.dataset.index);

};


function closeWindow() {
    openModal.classList.remove('is-open');

    closeModal.removeEventListener('click', closeWindow);
    overlay.removeEventListener('click', overlayClose)
    // imgModal.src = "";
    // imgModal.alt = "";

};


function overlayClose(event) {
    if (event.target !== event.target.dataset.source) {
        openModal.classList.remove('is-open');
    }
}

function onPressKey(event) {

    if (event.code === 'Escape') {
        closeWindow();
    }
    if (event.code === 'ArrowRight') {
        imgIndex + 1 === galleryItems.length ? (imgIndex = 0) : (imgIndex += 1)
        return imgModal.src = galleryItems[imgIndex].original;

    }
    if (event.code === 'ArrowLeft') {
        imgIndex === 0 ? (imgIndex = galleryItems.length - 1) : (imgIndex -= 1)
        return imgModal.src = galleryItems[imgIndex].original;
    }
}

































