import {openPopup, popupPictureBig} from './script.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._picture = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .getElementById('card-template')
            .content
            .querySelector('.card')
            .cloneNode(true);
        this._element = cardElement;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__heart').addEventListener("click", () => {
            this._showLike();
        }); //слушатель сердечка
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard(); //слушатель мусорного ведра
        });
        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._showPictureBig(); //слушатель увеличенной карточки
        });

    }

    _showPictureBig() {
        //добавляем поп-ап увеличения той картинки, на которую мы нажали

        document.querySelector('.popup__item').src = this._picture;//адрес будущей картинки это адрес картинки в карточке
        document.querySelector('.popup__item').alt = this._name;
        document.querySelector('.popup__name').textContent = this._name;
        openPopup(popupPictureBig);
    }

    generateCard() {
        // Запишем разметку в приватное поле _element.
        // Так у других элементов появится доступ к ней.
        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__item').src = this._picture;
        this._element.querySelector('.card__item').alt = this._name;
        this._element.querySelector('.card__header').textContent = this._name;
        return this._element;
    }

    _deleteCard() {
        this._element.remove()
    };

    _showLike() {
        //функция закрашивания сердечка по нажатию
        this._element.querySelector('.card__heart').classList.toggle("card__heart-active"); //event target помогает понять какое сердечко красить
    }
}