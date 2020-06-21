import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(data) {
        const popupItem = document.querySelector('.popup__item');
        const popupName = document.querySelector('.popup__name');
        popupItem.src = data.link;//адрес будущей картинки это адрес картинки в карточке
        popupItem.alt = data.name;
        popupName.textContent = data.name;
        super.open();
    }

}