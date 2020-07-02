import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupItem = document.querySelector('.popup__item');
        this.popupName = document.querySelector('.popup__name');
    }

    open(data) {
        this.popupItem.src = data.link;//адрес будущей картинки это адрес картинки в карточке
        this.popupItem.alt = data.name;
        this.popupName.textContent = data.name;
        super.open();
    }

}