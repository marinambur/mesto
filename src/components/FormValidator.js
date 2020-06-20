export class FormValidator {
    constructor(settings, element) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._nameClass = settings.nameClass;
        this._linkClass = settings.linkClass;
        this._element = element;
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                formElement,
                inputElement,
                inputElement.validationMessage,
            );
        } else {
            this._hideInputError(formElement, inputElement);
        }

    };

    _hasInvalidInput(inputList) {
        return inputList.every((inputElement) => {
            return inputElement.validity.valid;
        });
    };

    _toggleButtonState(inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        } else {
            // иначе сделай кнопку неактивной
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._setEventListeners(this._element);
    }

    /*deleteInputValues() {
        name: this._nameClass.value = '';
        link: this._linkClass.value = '';
    }

    eraser() {
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

    }*/
}






