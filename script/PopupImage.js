import {Popup} from './Popup.js';
export class PopupImage extends Popup {
    constructor(popupSelector, pictureBig) {
      super(popupSelector)
      this._pictureBig = pictureBig;
      return this._pictureBig;
    }
    _setEventListeners() {
        super._setEventListeners();
    }

    open(link, name) {
        this.popupSelector.classList.add('popup_opened');
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