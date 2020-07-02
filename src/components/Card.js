export class Card {
    constructor(cardSelector, putLike, deleteLike, {data, handleCardClick}, deleteCard) {
        this._name = data.name;
        this._picture = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner._id;
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

    _whoIsOwner(_owner) {
        //console.log(this._owner);
        if (this._owner === '60f3480b45ce6754456f4f17') {
        } else {
            this._element.querySelector('.card__delete').classList.add('card__delete_invisible');
        }
    }

    _cardDelete() {
        this._deleteCard(); // коллбэк для удаления карточки с сервера
        this._element.removeEventListener('click', this._cardHandler); // удаляем слушатели
    };

    // функция определяет клики по карточке
    _cardClickHandler(evt) {
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
        });
        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._handleCardClick(); //слушатель увеличенной карточки
        });
    }

    generateCard() {
        this._getTemplate();
        this._setEventListeners();
        const cardItem = this._element.querySelector('.card__item');
        const cardHeader = this._element.querySelector('.card__header');
        cardItem.src = this._picture;
        cardItem.alt = this._name;
        cardHeader.textContent = this._name;
        this._whoIsOwner(this._owner)
        if (this._likes.find(item => item._id === '60f3480b45ce6754456f4f17')) {
            this._element.querySelector('.card__heart').classList.add('card__heart-active');
        }
        return this._element;
    }

    _showLike() {
        if (this._element.querySelector('.card__heart').classList.contains('card__heart-active')) {
            this._element.querySelector('.card__heart').classList.remove("card__heart-active");
            this._element.querySelector('.card__span-like').textContent = this._likes.length -= 1;
            this._deleteLike(this._id);
            return;
        }
        this._element.querySelector('.card__heart').classList.add("card__heart-active");
        this._putLike(this._id);
        this._element.querySelector('.card__span-like').textContent = this._likes.length += 1;
    }
}