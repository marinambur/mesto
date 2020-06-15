import {Popup} from './Popup.js';
export class PopupImage extends Popup {
    constructor(item, popupSelector) {
      super(popupSelector)
      this._name = item.name;
      this._picture = item.link;
    }
    _setEventListeners() {
        super._setEventListeners();
    }

    open(link, name) {
        document.querySelector('.popup__item').src = this._picture;//адрес будущей картинки это адрес картинки в карточке
        document.querySelector('.popup__item').alt = this._name;
        document.querySelector('.popup__name').textContent = this._name
        super.open();
}
    _handleEscClose(evt) {
    super._handleEscClose(evt);
}
_handleClickClose(evt) {
    super._handleClickClose(evt);
}

    close() {
        super.close();
    }
}