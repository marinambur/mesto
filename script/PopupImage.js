import {Popup} from './Popup.js';
export class PopupImage extends Popup {
    constructor(popupSelector, pictureBig) {
      super(popupSelector)
      this._pictureBig = pictureBig;
      return this._pictureBig;
    }
    open(link, name) {
        this.popupSelector.classList.add('popup_opened');
        //this._pictureBig.src = link;
        //this._pictureBig.alt = name;
    }
  }