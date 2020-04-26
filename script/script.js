const gridContainer = document.querySelector('.grid');//нашли секцию, в которую будем добавлять карточки
const cardTemplate = document.querySelector('#grid-template').content;//нашли template в котором будем работать
const plus = document.querySelector('.profile__button-large');
const closePic = document.querySelector('.picture-add__button-close');
const button = document.querySelector('.profile__button-small');//находим кнопки
const close = document.querySelector('.popup__button-close');
const closeBigPicBtn = document.querySelector('.popup__button-close_big');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.form');
const formPictureAdd = document.querySelector('.form-add');
const popupPictureAdd = document.getElementById("picture-add");//id попапов
const popupInformation = document.getElementById("information");
const popupPictureBig = document.getElementById("picture-big");
const imageBig = document.querySelector('.popup__item');//нашли картинку в будущем поп-апе 
const imageHeader = document.querySelector('.popup__name');//нашли название в будущем попапе, который сейчас откроем
const nameInput = document.querySelector('.text-form_name');//находим поля форм
const jobInput = document.querySelector('.text-form_profession');
const placeInput = document.querySelector('.place-form_name');//находим поля форм в форме добавления картинки
const linkInput = document.querySelector('.place-form_link');
const profileTitle = document.querySelector('.profile__title');//здесь и далее находим заголовки, куда будут перезаписываться данные, введенные в форму, а также части формы
const profileSubtitle = document.querySelector('.profile__subtitle');
const initialCards = [//архив 6 картинок, данных в ТЗ

    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
function togglePopup(elem) {//открытие и закрытие всех форм
    if (elem.classList.contains('popup_opened')) {
        elem.classList.toggle('popup_opened')
    } else {
        elem.classList.toggle('popup_opened');
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
        placeInput.value = "";
        linkInput.value = "";
    }
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup(popupInformation);
}//нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап

function addCard(name, picture) {//собираем карточку
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.grid__header').textContent = name;
    cardElement.querySelector('.grid__item').src = picture;
    cardElement.querySelector('.grid__heart').addEventListener('click', showLike);//слушатель сердечка
    cardElement.querySelector('.grid__delete').addEventListener('click', deleteCard);//слушатель удаления картинки
    cardElement.querySelector('.grid__picture').addEventListener('click', showPictureBig);//слушатель открывания большой картинки
    return cardElement;
}

function formSubmitPictureAdd(evt) {//добавляем картинку и название из данных формы
    evt.preventDefault();
    gridContainer.prepend(addCard(placeInput.value, linkInput.value));//добавили картинку впереди остальных
    togglePopup(popupPictureAdd);//закрыли форму добавления картинки
}

initialCards.forEach(function addCardFromArray(item) {//добавление картинок из цикла
    gridContainer.prepend(addCard(item.name, item.link));//добавили полученную карточку в секцию
});

function showLike(evt) {//функция закрашивания сердечка по нажатию
    evt.target.classList.toggle('grid__heart-active');//event target помогает понять какое сердечко красить
}

function deleteCard(evt) {//функция удаления карточки
    evt.target.closest('.grid__box').remove();//event target помогает удалить карточку, closest помогает найти родителя именно этого мусорного ведра именно этой карточки
}

function showPictureBig(evt) {//добавляем поп-ап увеличения той картинки, на которую мы нажали
    imageBig.src = evt.target.src;//адрес будущей картинки это адрес картинки в карточке 
    imageHeader.textContent = evt.target.closest('.grid__box').lastElementChild.textContent;
    togglePopup(popupPictureBig);
}
//кнопка плюса, листенеры на кнопку открытия и на крестик закрытия
plus.addEventListener('click', () => togglePopup(popupPictureAdd));
closePic.addEventListener('click', () => togglePopup(popupPictureAdd));

//кнопка карандаш, листенеры на кнопку открытия и на крестик закрытия
button.addEventListener('click', () => togglePopup(popupInformation));
close.addEventListener('click', () => togglePopup(popupInformation));
closeBigPicBtn.addEventListener('click', () => togglePopup(popupPictureBig));
formElement.addEventListener('submit', formSubmitHandler);
formPictureAdd.addEventListener('submit', formSubmitPictureAdd);



