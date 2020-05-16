const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formObject
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
};

const hideInputError = (formElement, inputElement, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formObject
    );
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

const hasInvalidInput = (inputList, formObject) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, formObject) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, formObject)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formObject.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, formObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

const enableValidation = (formObject) => {
  const formList = Array.from(
    document.querySelectorAll(formObject.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formObject);
  });
};
enableValidation({
  formSelector: ".form",
  inputSelector: ".text-form",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: ".form__save_inactive",
  inputErrorClass: ".text-form_error",
  errorClass: ".text-form-error_active",
});
