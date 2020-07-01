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
        location.reload();
        this.submitForm(this._getInputValues());
    }

    _getInputValues() {
        this._inputList = this.popupSelector.querySelectorAll('.text-form');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues)
        return this._formValues;

    }


    close() {
        this.popupSelector.removeEventListener('submit', this.submitForm);
        this.popupSelector.querySelector('form').reset();//по условию задания close() должен тут перезаписываться и сбрасывать форму
        super.close();
    }
}