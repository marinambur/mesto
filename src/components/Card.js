
export class Card {
    constructor(cardSelector, {data, handleCardClick}) {
        this._name = data.name;
        this._picture = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = this._cardSelector
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

    _deleteCard() {
        this._element.remove()
    };

    _showLike() {
        //функция закрашивания сердечка по нажатию
        this._element.querySelector('.card__heart').classList.toggle("card__heart-active"); //event target помогает понять какое сердечко красить
    }
}