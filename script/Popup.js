
export class Popup {
    constructor(popupSelector) {
        this.popupSelector=popupSelector;
        this._setEventListeners();
    }
    open() {
        this.popupSelector.classList.add("popup_opened");
    }

    close() {
        this.popupSelector.classList.remove("popup_opened");
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close()
        }
    }
    _setEventListeners() {
        this.closeButton = this.popupSelector.querySelector('.popup__button-close');
        this.closeButton.addEventListener('click', () => this.close());
    }
}
