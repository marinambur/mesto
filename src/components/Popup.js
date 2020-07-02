export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.closeButton = popupSelector.querySelector('.popup__button-close');
    }

    _setEventListeners() {
        this._handleEsc = this._handleEscClose.bind(this);
        this._handleClose = this.close.bind(this);
        this._handleClick = this._handleClickClose.bind(this);
        this.closeButton.addEventListener('click', this._handleClose);
        document.addEventListener('keydown', this._handleEsc);
        document.addEventListener('click', this._handleClick);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close()
        }
    }

    _handleClickClose(evt) {
        if (evt.target.classList.contains("popup_opened")) {
            this.close()
        }
    }

    close() {
        this.closeButton.removeEventListener('click', this._handleClose);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('keydown', this._handleEsc);
        this.popupSelector.classList.remove("popup_opened");
    }

    open() {
        this._setEventListeners();
        this.popupSelector.classList.add("popup_opened");
    }
}
