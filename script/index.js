import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const plus = document.querySelector(".profile__button-large");
const closePic = document.querySelector(".picture-add__button-close");
const button = document.querySelector(".profile__button-small"); //находим кнопки
const close = document.querySelector(".popup__button-close");
const closeBigPicBtn = document.querySelector(".popup__button-close_big");
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const formPictureAdd = document.querySelector(".form-add");
const popupPictureAdd = document.getElementById("picture-add"); //id попапов
const errorPlace = document.getElementById("name-place-error"); //ошибки инпутов
const errorUrl = document.getElementById("link-place-error");
const errorName = document.getElementById("name-input-error");
const errorProfession = document.getElementById("profession-error");
const popupInformation = document.getElementById("information");
export const popupPictureBig = document.getElementById("picture-big");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_profession");
const placeInput = document.querySelector(".place-form_name"); //находим поля форм в форме добавления картинки
const linkInput = document.querySelector(".place-form_link");
const profileTitle = document.querySelector(".profile__title"); //здесь и далее находим заголовки, куда будут перезаписываться данные, введенные в форму, а также части формы
const profileSubtitle = document.querySelector(".profile__subtitle");
const popups = Array.from(document.querySelectorAll(".popup"));
const forms = Array.from(document.querySelectorAll('.popup__container')); // массив форм
const errors = Array.from(document.querySelectorAll(".form__error")); //ошибки
const inputs = Array.from(document.querySelectorAll(".text-form"));
const formObject = {
    formSelector: ".form",
    inputSelector: ".text-form",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "text-form_error",
    errorClass: "text-form-error_active",
};
const initialCards = [
    //архив 6 картинок, данных в ТЗ

    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинск",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

function clickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
        closePopup(evt.target);
    }
}

function escClose(evt) {
    if (evt.key === "Escape") {
        popups.forEach((popup) => {
            if (popup.classList.contains("popup_opened")) {
                closePopup(popup);
            }
        });
    }
}

function setEscapeAndClickListener(elem) {
    document.addEventListener("keydown", escClose);
    elem.addEventListener("click", clickClose);
}

function removeEscapeAndClickListener(elem) {
    document.removeEventListener("keydown", escClose);
    elem.removeEventListener("click", clickClose);
}

function eraser() {
    errors.forEach((span) => {
        span.classList.remove(formObject.errorClass);
        // удалим текст с ошибкой
        span.textContent = "";
    });
    inputs.forEach((input) => {
        input.classList.remove(formObject.inputErrorClass); // удалим ошибку
    });
}

export function openPopup(elem) {
    elem.classList.add("popup_opened");
    setEscapeAndClickListener(elem);
}

function closePopup(elem) {
    removeEscapeAndClickListener(elem);
    elem.classList.remove("popup_opened");
}

function openPlaceForm(elem) {
    placeInput.value = "";
    linkInput.value = "";
    //если элемент инпута формы содержит класс inputErrorClass - eraser и openpopup, иначе просто openPopup
    if (
        errorPlace.classList.contains(formObject.errorClass) ||
        errorUrl.classList.contains(formObject.errorClass)
    ) {
        eraser(elem);
        openPopup(elem);
    } else {
        openPopup(elem);
    }
}

function openInformationForm(elem) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    if (
        errorName.classList.contains(formObject.errorClass) ||
        errorProfession.classList.contains(formObject.errorClass)
    ) {
        eraser(elem);
        openPopup(elem);
    } else {
        openPopup(elem);
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupInformation);
} //нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап

initialCards.forEach((item) => {
    const card = new Card(item, '#template');
    // Добавляем в DOM
    document.querySelector('.grid').prepend(card.generateCard());
});

function formSubmitPictureAdd(evt) {
    //добавляем картинку и название из данных формы
    evt.preventDefault();
    const object = {};
    object.link = linkInput.value;
    object.name = placeInput.value;

    const card = new Card(object, '#template');
    // Добавляем в DOM
    document.querySelector('.grid').prepend(card.generateCard());
    closePopup(popupPictureAdd); //закрыли форму добавления картинки
}

function startValidation() {
    forms.forEach((form) => {
        const valid = new FormValidator({
            inputSelector: ".text-form",
            submitButtonSelector: ".form__save",
            inactiveButtonClass: "form__save_inactive",
            inputErrorClass: "text-form_error",
            errorClass: "text-form-error_active",
        }, form);
        valid.enableValidation();
    });
}

startValidation();
//кнопка плюса, листенеры на кнопку открытия и на крестик закрытия
plus.addEventListener("click", () => openPlaceForm(popupPictureAdd));
closePic.addEventListener("click", () => closePopup(popupPictureAdd));
//кнопка карандаш, листенеры на кнопку открытия и на крестик закрытия
button.addEventListener("click", () => openInformationForm(popupInformation));
close.addEventListener("click", () => closePopup(popupInformation));
closeBigPicBtn.addEventListener("click", () => closePopup(popupPictureBig));
formaElement.addEventListener("submit", formSubmitHandler);
formPictureAdd.addEventListener("submit", formSubmitPictureAdd);
