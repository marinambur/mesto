import {Popup} from "./Popup.js";
const formObject = {
    formSelector: ".form",
    inputSelector: ".text-form",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "text-form_error",
    errorClass: "text-form-error_active",
};
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_profession");
export class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this.submitForm = submitForm;
    }
    _setEventListeners() {
        this.popupSelector.addEventListener('submit', this.submitForm)
        super._setEventListeners();
    }
    getInputValues() {
        const item = {
            name: this.popupSelector.querySelector(".text-form_name").value,
            link: this.popupSelector.querySelector(".text-form_profession").value
        };
        return item;
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
      _handleEscClose(evt) {
          super._handleEscClose(evt);
      }

    close() {
          this.popupSelector.removeEventListener('submit', this._submitForm);
          this._eraser();
          super.close();
      }
}