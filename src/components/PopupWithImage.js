import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(item, popupSelector) {
      super(popupSelector)
      this._name = item.name;
      this._picture = item.link;
    }
    _setEventListeners() {
        super._setEventListeners();
    }

    open(link, name) {
    const popupItem = document.querySelector('.popup__item');
    const popupName = document.querySelector('.popup__name');
        popupItem.src = this._picture;//адрес будущей картинки это адрес картинки в карточке
        popupItem.alt = this._name;
        popupName.textContent = this._name
        super.open();
}

}