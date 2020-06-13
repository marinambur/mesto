import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {PopupImage} from "./PopupImage.js";
import {Section} from "./Section.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";


const plus = document.querySelector(".profile__button-large");
const button = document.querySelector(".profile__button-small"); //находим кнопки
const cardListSelector = document.querySelector('.grid');
const popupPictureAdd = document.getElementById("picture-add"); //id попапов
const popupInformation = document.getElementById("information");
export const popupPictureBig = document.getElementById("picture-big");
const forms = Array.from(document.querySelectorAll('.popup__container')); // массив форм

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

const openPicForm = function () {
    const OpenFormPic = new PopupWithForm(popupPictureAdd, {
        submitForm: (evt) => {
            evt.preventDefault();
            const item = OpenFormPic.getInputValues();
            const card = new Card('#template', {
                data: item, handleCardClick: () => {
                    const popupBigPicture = new PopupImage(item, popupPictureBig)
                    popupBigPicture.open();
                }
            });
            const cardElement = card.generateCard();
            CardList.setItem(cardElement);
            OpenFormPic.close();
        }
    },);
    OpenFormPic.deleteInputValues();
    OpenFormPic.open()
}
const openInfoForm = function () {
    const user_name = document.querySelector('.profile__title');
    const user_info = document.querySelector('.profile__subtitle');
    const userInfo = new UserInfo(user_name, user_info);
    const OpenFormInfo = new PopupWithForm(popupInformation, {
        submitForm: (evt) => {
            evt.preventDefault();
            userInfo.setUserInfo();
            OpenFormInfo.close();
        }
    });
    userInfo.getUserInfo();
    OpenFormInfo.open();
}
const CardList = new Section({
    items, renderer: (item) => {
        const card = new Card('#template', {
            data: item, handleCardClick: () => {
                const popupBigPicture = new PopupImage(item, popupPictureBig)
                popupBigPicture.open();
            }
        });
        const cardElement = card.generateCard();
        CardList.setItem(cardElement);
    }
}, cardListSelector);

CardList.renderItems(items);

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
plus.addEventListener("click", () => openPicForm());
button.addEventListener("click", () => openInfoForm());

