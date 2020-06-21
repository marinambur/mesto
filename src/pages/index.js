import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

const plus = document.querySelector(".profile__button-large");
const button = document.querySelector(".profile__button-small"); //находим кнопки
const cardListSelector = document.querySelector('.grid');
const popupPictureAdd = document.getElementById("picture-add"); //id попапов
const popupInformation = document.getElementById("information");
export const popupPictureBig = document.getElementById("picture-big");
const forms = Array.from(document.querySelectorAll('.popup__container')); // массив форм
const template = document.getElementById('card-template');
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_subject");
const formObject = {
    formSelector: ".form",
    inputSelector: ".text-form",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "text-form_error",
    errorClass: "text-form-error_active",
};

export const items = [
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

const eraser = () => {
    const errors = Array.from(document.querySelectorAll(".form__error"));
    const inputs = Array.from(document.querySelectorAll(".text-form"));
    errors.forEach((span) => {
        span.classList.remove(formObject.errorClass);
        // удалим текст с ошибкой
        span.textContent = "";
    });
    inputs.forEach((input) => {
        input.classList.remove(formObject.inputErrorClass); // удалим ошибку
    });

}

const openFormPic = new PopupWithForm(popupPictureAdd, {
    submitForm: (item) => {
        const card = new Card(template, {
            data: item, handleCardClick: () => {
                popupBigPicture.open(item);
            }
        });
        const cardElement = card.generateCard();
        CardList.setItem(cardElement);
        openFormPic.close();
    }
},);
const popupBigPicture = new PopupWithImage(popupPictureBig);
const openPicForm = function () {
    eraser();
    openFormPic.open()
}

export const formProfileInfo = {
    profileAuthor: document.querySelector('.profile__title'),
    profileStatus: document.querySelector('.profile__subtitle'),
};


function startValidation() {
    forms.forEach((form) => {
        const valid = new FormValidator({
            inputSelector: ".text-form",
            submitButtonSelector: ".form__save",
            inactiveButtonClass: "form__save_inactive",
            inputErrorClass: "text-form_error",
            errorClass: "text-form-error_active",
            nameClass: ".text-form_name",
            linkClass: ".text-form_subject"
        }, form);
        valid.enableValidation();
    });
}

startValidation();


const userInfo = new UserInfo(formProfileInfo);
const openFormInfo = new PopupWithForm(popupInformation, {
    submitForm: (item) => {
        userInfo.setUserInfo(item);
        openFormInfo.close();
    }
});

const openInfoForm = () => {
    const infoUser = userInfo.getUserInfo();
    nameInput.value = infoUser.name;
    jobInput.value = infoUser.info;
    eraser();
    openFormInfo.open();
}

const CardList = new Section({
    items, renderer: (item) => {
        const card = new Card(template, {
            data: item, handleCardClick: () => {
                const popupBigPicture = new PopupWithImage(popupPictureBig)
                popupBigPicture.open(item);
            }
        });
        const cardElement = card.generateCard();
        CardList.setItem(cardElement);
    }
}, cardListSelector);

CardList.renderItems(items);

plus.addEventListener("click", () => openPicForm());
button.addEventListener("click", () => openInfoForm());

