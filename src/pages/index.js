
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




/*const OpenFormPic = new PopupWithForm(popupPictureAdd, {
    submitForm: (item) => {
        const cardElement = card.generateCard();
        CardList.setItem(cardElement);
        OpenFormPic.close();
    }
},);


const item = OpenFormPic._getInputValues();
console.log(item);
const card = new Card(template, {
    data: item, handleCardClick: () => {
        popupBigPicture.open();
    }
});
const popupBigPicture = new PopupWithImage(item, popupPictureBig)
const openPicForm = function () {
    OpenFormPic._deleteInputValues();
    OpenFormPic.open()
}*/

const openPicForm = function () {

    const OpenFormPic = new PopupWithForm(popupPictureAdd, {
        submitForm: (item) => {

            const card = new Card(template, {
                data: item, handleCardClick: () => {

                    const popupBigPicture = new PopupWithImage(item, popupPictureBig)
                    popupBigPicture.open();
                }
            });
            const cardElement = card.generateCard();
            CardList.setItem(cardElement);
            OpenFormPic.close();
        }
    },);
    OpenFormPic._deleteInputValues();
    OpenFormPic.open()
}

/*const userInfoSub = document.querySelector('.profile__subtitle');
const userInfo = new UserInfo(userName, userInfoSub);
const openInfoForm = function () {
    const OpenFormInfo = new PopupWithForm(popupInformation, {
        submitForm: (item) => {
            userInfo.setUserInfo(item);
            OpenFormInfo.close();
        }
    });
    userInfo.getUserInfo();
    OpenFormInfo.open();
}*/
export const formProfileInfo = {
    profileAuthor: document.querySelector('.profile__title'),
    profileStatus: document.querySelector('.profile__subtitle'),
};




const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_profession");

const openInfoForm = () => {
    const userInfo = new UserInfo(formProfileInfo);
    const OpenFormInfo = new PopupWithForm (popupInformation, {
        submitForm: (item) => {
            console.log('item', item);
            userInfo.setUserInfo(item);
            OpenFormInfo.close();
        }
    }, );

    /*открытие/закрытие профиля*/
    const infoUser = userInfo.getUserInfo();
    console.log(infoUser.name);
    console.log(infoUser.info);


    nameInput.value = infoUser.name;
    jobInput.value = infoUser.info;
    OpenFormInfo.open();
   // cleanErrors(formProfile);
};
/*const  = function () {

                OpenFormInfo.close();
        }

    userInfo.getUserInfo();
    OpenFormInfo.open();
}*/

const CardList = new Section({
    items, renderer: (item) => {
        const card = new Card(template, {
            data: item, handleCardClick: () => {
                const popupBigPicture = new PopupWithImage(item, popupPictureBig)
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

