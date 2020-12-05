import galleryItems from './gallery-items.js';

class Gallery{
    constructor(galleryItems){
        this.galleryItems = galleryItems;
        this.listGalleryRef = document.querySelector('.js-gallery');
        this.modalRef = document.querySelector('.js-lightbox');
        this.imageModalRef = document.querySelector('.lightbox__image');
        this.closeModalButton = document.querySelector(
            'button[data-action="close-lightbox"]',
        );
        this.overlayRef = document.querySelector('.lightbox__overlay');
        this.indexCurrentImage = 0;
    }

    createLi({ original, preview, description }, index) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
    
        li.classList.add('gallery__item');
        a.classList.add('gallery__link');
        img.classList.add('gallery__image');
    
        a.href = original;
        img.src = preview;
        img.alt = description;
        img.setAttribute('data-source', original);
        img.setAttribute('data-index', index);
        a.append(img);
        li.append(a);
        return li;
    }

    createGallery(galleryItems) {
        return galleryItems.map((liItem, index) => {
            return this.createLi(
                {
                    original: liItem.original,
                    preview: liItem.preview,
                    description: liItem.description,
                },
                index,
            );
        });
    }

    onOpenModal(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'IMG') {
            return;
        }
        this.indexCurrentImage = Number(event.target.dataset.index);
        this.modalRef.classList.add('is-open');
        this.imageModalRef.src = event.target.dataset.source;
        this.imageModalRef.alt = event.target.alt;
        this.closeModalButton.addEventListener('click', this.onCloseModal.bind(this));
        this.overlayRef.addEventListener('click', this.onCloseModal.bind(this));
       
    }
    
    onCloseModal() {
        this.modalRef.classList.remove('is-open');
        this.imageModalRef.src = '';
    }

    onPressKey(event) {
        switch (event.code) {
            case 'Escape':
                this.onCloseModal();
                break;
            case 'ArrowRight':
                this.indexCurrentImage + 1 === this.galleryItems.length
                    ? (this.indexCurrentImage = 0)
                    : (this.indexCurrentImage += 1);
                    this.imageModalRef.src = this.galleryItems[this.indexCurrentImage].original;
                break;
    
            case 'ArrowLeft':
                this.indexCurrentImage === 0
                    ? (this.indexCurrentImage = this.galleryItems.length - 1)
                    : (this.indexCurrentImage -= 1);
                    this.imageModalRef.src = this.galleryItems[this.indexCurrentImage].original;
                break;
            default:
                break;
        }
    }

    addListeners(){
        window.addEventListener('keydown', this.onPressKey.bind(this));
        this.listGalleryRef.addEventListener('click', this.onOpenModal.bind(this));
    }

    init(){
        this.listGalleryRef.append(...this.createGallery(this.galleryItems));
        this.addListeners();
    }

    logThis(){
        console.log(this);
    }
}


let myGallery = new Gallery(galleryItems);
myGallery.init()

myGallery.logThis();