import {Popup} from "./Popup.js";

const formObject = {
    formSelector: ".form",
    inputSelector: ".text-form",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "text-form_error",
    errorClass: "text-form-error_active",
};

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
            link: this.popupSelector.querySelector(".text-form_profession").value
        };
        return item;
    }

    _deleteInputValues() {
        name: this.popupSelector.querySelector(".text-form_name").value = '';
        link: this.popupSelector.querySelector(".text-form_profession").value = '';
    }

    _eraser() {
        const errors = Array.from(this.popupSelector.querySelectorAll(".form__error"));
        const inputs = Array.from(this.popupSelector.querySelectorAll(".text-form"));
        errors.forEach((span) => {
            span.classList.remove(formObject.errorClass);
            // удалим текст с ошибкой
            span.textContent = "";
        });
        inputs.forEach((input) => {
            input.classList.remove(formObject.inputErrorClass); // удалим ошибку
        });

    }

    close() {
        this.popupSelector.removeEventListener('submit', this.submitForm);
        this._eraser();
        this._deleteInputValues();
        super.close();
    }
}