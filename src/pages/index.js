import '../pages/index.css';
import {Card} from '../components/Card.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Popup} from "../components/Popup.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {startValidation} from "../components/utils/functions.js";
import {eraser} from "../components/utils/functions.js";

const plus = document.querySelector(".profile__button-large");
const button = document.querySelector(".profile__button-small"); //находим кнопки
const cardListSelector = document.querySelector('.grid');
const popupPictureAdd = document.getElementById("picture-add"); //id попапов
const popupInformation = document.getElementById("information");
const popupSure = document.getElementById("sure");
const popupAvatar = document.getElementById("avatar");
export const popupPictureBig = document.getElementById("picture-big");
export const forms = Array.from(document.querySelectorAll('.popup__container')); // массив форм
const template = document.getElementById('card-template');
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_subject");
const editAvatar = document.querySelector('.profile__avatar_hover');
export const formObject = {
    formSelector: ".form",
    inputSelector: ".text-form",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "text-form_error",
    errorClass: "text-form-error_active",
};

export const token = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
        authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9',
        'Content-Type': 'application/json'
    },
};

export const api = new Api(token);


const openFormPic = new PopupWithForm(popupPictureAdd, {

    submitForm: (item) => {
        api.toAddNewCard(item.name, item.link)
            .catch((err) => {
                console.log(err);
            });
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
    profileAvatar: document.querySelector('.profile__avatar'),
};

startValidation();

const userInfo = new UserInfo(formProfileInfo);

api.getUserInfo()
    .then((user) => {
        userInfo.getUserInfo(user.name, user.about, user.avatar);
        userInfo.setUserInfo(user);

    })
    .catch((err) => {
        console.log(err);
    });

const openFormInfo = new PopupWithForm(popupInformation, {
    submitForm: () => {
        api.uploadUserInfo(nameInput.value, jobInput.value)
            .then(data => userInfo.setUserInfo(data.name, data.about));
        openFormInfo._setSubmitForm();
        console.log(nameInput.value, jobInput.value)
            .catch((err) => {
                console.log(err);
            });

    },
});

const openInfoForm = () => {
    const infoUser = userInfo.getUserInfo();
    nameInput.value = infoUser.name;
    jobInput.value = infoUser.info;
    eraser();
    openFormInfo.open();
}
api.getInitialCards()
    .then((items) => {
        CardList.renderItems(items);
    })
    .catch((err) => {
        console.log(err);
    });

const CardList = new Section({
    renderer: (item) => {
        const card = new Card(template, () => api.putLike(item._id), () => api.deleteLike(item._id), {
            data: item, handleCardClick: () => {
                popupBigPicture.open(item);
            }
        }, () => surePopup.submit(item._id));
        const cardElement = card.generateCard();
        CardList.setItem(cardElement);
    }
}, cardListSelector);

const surePopup = new Popup(popupSure);
surePopup.submit = function (_id) {
    surePopup.open();
    popupSure.addEventListener('submit', evt => {
        evt.preventDefault();
        document.getElementById(_id).remove();
        api.deleteCard(_id);
        this.close();
    });
};

const changeAvatar = new PopupWithForm(popupAvatar, {
    submitForm: (item) => {
        api.setUserAvatar(item.link)
            .then(() => {
                changeAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })


    }

});
editAvatar.addEventListener('click', () => {
    changeAvatar.open();
})


plus.addEventListener("click", () => openPicForm());
button.addEventListener("click", () => openInfoForm());

