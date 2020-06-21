import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this.submitForm = submitForm;
    }

    _setEventListeners() {
        this._submit = this._setSubmitForm.bind(this);
        this.popupSelector.addEventListener('submit', this._submit, {once: true});
        super._setEventListeners();
    }

    _setSubmitForm(evt) {
        evt.preventDefault();
        this.submitForm(this._getInputValues());
    }

    _getInputValues() {
        const item = {
            name: this.popupSelector.querySelector(".text-form_name").value,
            link: this.popupSelector.querySelector(".text-form_subject").value
        };
        return item;
    }

    close() {
        this.popupSelector.removeEventListener('submit', this.submitForm);
        this.popupSelector.querySelector('form').reset();//по условию задания close() должен тут перезаписываться и сбрасывать форму
        super.close();
    }
}