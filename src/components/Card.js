import {Api} from "./Api.js";
import {Popup} from "./Popup.js";
/* import {openSurePopup} from "../pages/index.js"; */
export const token = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
        authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9',
        'Content-Type': 'application/json'
    },
};

export const api = new Api(token);

export class Card {
    constructor(cardSelector, putLike, deleteLike, {data, handleCardClick}, deleteCard) {
        this._name = data.name;
        this._picture = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard;
    }

    _getTemplate() {
        const cardElement = this._cardSelector
            .content
            .querySelector('.card')
            .cloneNode(true);

        this._element = cardElement;
        this._element.id = this._id;
        this._element.querySelector('.card__span-like').textContent = this._likes.length;
        return this._element;
    }

    /*_cardClickHandler (evt) {
        if (evt.target.classList.contains('card__heart')) {

            this._showLike(evt);
        }
    }*/

    // функция удаления картчоки
    _cardDelete () {
        this._deleteCard(); // коллбэк для удаления карточки с сервера
        this._element.removeEventListener('click', this._cardHandler); // удаляем слушатели
    };

    // функция определяет клики по карточке
    _cardClickHandler (evt) {
        if (evt.target.classList.contains('card__delete')) {  // удаление
            this._cardDelete();
        }
    };

    _setEventListeners() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);

        this._element.querySelector('.card__heart').addEventListener("click", () => {
            this._showLike();
        }); //слушатель сердечка
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            //this._deleteCard(this._id); //слушатель мусорного ведра
            //openSurePopup(this._id);
        });
        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._handleCardClick(); //слушатель увеличенной карточки
        });
    }

    generateCard() {
        // Запишем разметку в приватное поле _element.
        // Так у других элементов появится доступ к ней.
        this._getTemplate();
        this._setEventListeners();
        const cardItem = this._element.querySelector('.card__item');
        const cardHeader = this._element.querySelector('.card__header');
        cardItem.src = this._picture;
        cardItem.alt = this._name;
        cardHeader.textContent = this._name;
        return this._element;
    }


/*_surePopup(this._id) {
    (document.getElementById("sure").classList.add("popup_opened"));
    console.log(document.getElementById("sure").classList);
    console.log(document.getElementById("sure"))
    const popupSelector = document.getElementById("sure");
    //console.log(this._element.querySelector('.form__save'))
    const formSure = popupSelector.querySelector(".form__save");
    console.log(formSure);

    function submitSure(id) {
        //evt.preventDefault();
        location.reload();
        this._deleteCard(id)
    }
    formSure.addEventListener("submit", popupSelector.addEventListener('submit', () => submitSure(this._id),  {once: true}));
}*/




_deleteCard1(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${id}`,{
        method: 'DELETE',
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
        headers: {
            authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9',
            'Content-Type': 'application/json'
        },

    })
        .then(this._element.remove())
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error${res.status}`);
        });

    //api.deleteCard()
    //

};


    /*_toggleLike (evt) {
        if (evt.target.classList.contains('elements__like_active')) {
            evt.target.classList.remove('elements__like_active');  // удалем модификатор
            this._element.querySelector('.elements__like-counter').textContent = this._likes.length -= 1;
            this._deleteLike(this._id);
            return;
        }
        evt.target.classList.add('elements__like_active');  // добавляем модификатор
        this._putLike(this._id);
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length += 1;
    };*/

    _showLike() {
        console.log(this._element.querySelector('.card__heart').classList.contains('card__heart-active'));
        if (this._element.querySelector('.card__heart').classList.contains('card__heart-active')) {
//if (this._element.querySelector('.card__heart')).contains() ===true;
            //evt.target.classList.remove('card__heart-active');
            this._element.querySelector('.card__heart').classList.remove("card__heart-active");
            this._element.querySelector('.card__span-like').textContent = this._likes.length -= 1;
            this._deleteLike(this._id);
            return;
        }
       // evt.target.classList.add('card__heart-active');  // добавляем модификатор
        this._element.querySelector('.card__heart').classList.add("card__heart-active");
        this._putLike(this._id);
        this._element.querySelector('.card__span-like').textContent = this._likes.length += 1;
        //функция закрашивания сердечка по нажатию
        //this._element.querySelector('.card__heart').classList.toggle("card__heart-active");
        //this._putLike(this._id);
        //event target помогает понять какое сердечко красить
    }
}