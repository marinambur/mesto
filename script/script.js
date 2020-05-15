const gridContainer = document.querySelector('.grid');//нашли секцию, в которую будем добавлять карточки
const cardTemplate = document.querySelector('#card-template').content;//нашли template в котором будем работать
const plus = document.querySelector('.profile__button-large');
const closePic = document.querySelector('.picture-add__button-close');
const button = document.querySelector('.profile__button-small');//находим кнопки
const close = document.querySelector('.popup__button-close');
const closeBigPicBtn = document.querySelector('.popup__button-close_big');
const popup = document.querySelector('.popup');
const formaElement = popup.querySelector('.form');
const formPictureAdd = document.querySelector('.form-add');
const popupPictureAdd = document.getElementById("picture-add");//id попапов
const popupInformation = document.getElementById("information");
const popupPictureBig = document.getElementById("picture-big");
const imageBig = document.querySelector('.popup__item');//нашли картинку в будущем поп-апе 
const imageHeader = document.querySelector('.popup__name');//нашли название в будущем попапе, который сейчас откроем
const nameInput = formaElement.querySelector('.text-form_name');//находим поля форм
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
    if (!elem.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
        placeInput.value = "";
        linkInput.value = "";
    }
    elem.classList.toggle('popup_opened');
};



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);


  inputElement.classList.add('text-form_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('text-form-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('text-form_error');
  errorElement.classList.remove('text-form-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};





const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
      
  })

};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__save_inactive');
    buttonElement.disabled = true; 
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('form__save_inactive');
    buttonElement.disabled = false; 
  }
};


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.text-form'));
  const buttonElement = formElement.querySelector('.form__save');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
enableValidation();

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup(popupInformation);
}//нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап

function showLike(evt) {//функция закрашивания сердечка по нажатию
    evt.target.classList.toggle('card__heart-active');//event target помогает понять какое сердечко красить
}

function deleteCard(evt) {//функция удаления карточки
    evt.target.closest('.card').remove();//event target помогает удалить карточку, closest помогает найти родителя именно этого мусорного ведра именно этой карточки
}

function showPictureBig(evt) {//добавляем поп-ап увеличения той картинки, на которую мы нажали
    const item = evt.target;
    imageBig.src = item.src;//адрес будущей картинки это адрес картинки в карточке
    imageBig.alt = item.dataset.name;
    imageHeader.textContent = item.dataset.name;
    togglePopup(popupPictureBig);
}

function addCard(name, picture) {//собираем карточку
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementItem = cardElement.querySelector('.card__item');
    const cardElementPicture = cardElement.querySelector('.card__picture');
    const cardElementHeader = cardElement.querySelector('.card__header');
    const cardElementHeart = cardElement.querySelector('.card__heart');
    const cardElementDelete = cardElement.querySelector('.card__delete');
    cardElementHeader.textContent = name;
    cardElementItem.src = picture;
    cardElementItem.dataset.name = name;
    cardElementHeart.addEventListener('click', showLike);//слушатель сердечка
    cardElementDelete.addEventListener('click', deleteCard);//слушатель удаления картинки
    cardElementPicture.addEventListener('click', showPictureBig);//слушатель открывания большой картинки
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

//кнопка плюса, листенеры на кнопку открытия и на крестик закрытия
plus.addEventListener('click', () => togglePopup(popupPictureAdd));
closePic.addEventListener('click', () => togglePopup(popupPictureAdd));

//кнопка карандаш, листенеры на кнопку открытия и на крестик закрытия
button.addEventListener('click', () => togglePopup(popupInformation));
close.addEventListener('click', () => togglePopup(popupInformation));
closeBigPicBtn.addEventListener('click', () => togglePopup(popupPictureBig));
formaElement.addEventListener('submit', formSubmitHandler);
formPictureAdd.addEventListener('submit', formSubmitPictureAdd);