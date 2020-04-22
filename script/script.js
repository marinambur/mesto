const button = document.querySelector('.profile__button-small');/*находим кнопки*/
const close = document.querySelector('.popup__button-close');
const closePic = document.querySelector('.picture-add__button-close');
const gridContainer = document.querySelector('.grid');//нашли секцию, в которую будем добавлять карточки
const gridTemplate = document.querySelector('#grid-template').content;//нашли template в котором будем работать
const plus = document.querySelector('.profile__button-large');




const nameInput = document.querySelector('.text-form_name');//находим поля форм
const jobInput = document.querySelector('.text-form_profession');

const placeInput = document.querySelector('.place-form_name');//находим поля форм в форме добавления картинки
const linkInput = document.querySelector('.place-form_link');



const profileTitle = document.querySelector('.profile__title');//здесь и далее находим заголовки, куда будут перезаписываться данные, введенные в форму, а также части формы
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');//нашли 2 попапа
const pictureAdd = document.querySelector('.picture-add');

const formElement = popup.querySelector('.form');
const formPictureAdd = document.querySelector('.form-add');
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}//открываем форму при нажатии на кнопку-карандаш. в форме в этот момент сохраненные значения заголовков (если нажать на крест, этих данных не будет в форме при открытии, для этого value)
function showPictureAdd() {
    pictureAdd.classList.add('picture-add_opened');
    placeInput.value = placeInput.textContent;
    linkInput.value = linkInput.textContent;
}



function closePopup() {
    popup.classList.remove('popup_opened');
}//нажимаем на крест, введенные в форму данные не сохраняются, только исчезает попап
function closePictureAdd() {
    pictureAdd.classList.remove('picture-add_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}//нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап (переиспользуется та же функция, что и в кнопке-крестик)

function formSubmitPictureAdd(evt) {
    evt.preventDefault();
    const gridElement = gridTemplate.cloneNode(true);//клонируем скелет карточки чтобы начать добавлять в нее элементы
    gridElement.querySelector('.grid__header').textContent = placeInput.value;
    gridElement.querySelector('.grid__item').src = linkInput.value;
    gridContainer.prepend(gridElement);
    closePictureAdd();
    gridContainer.querySelector('.grid__heart').addEventListener('click', showLike);
    gridContainer.querySelector('.grid__delete').addEventListener('click', delete_card);
}

close.addEventListener('click', closePopup);
closePic.addEventListener('click', closePictureAdd);//слушатели событий по кликам на кнопки, запускают функции
button.addEventListener('click', showPopup);
plus.addEventListener('click', showPictureAdd);
formElement.addEventListener('submit', formSubmitHandler);
formPictureAdd.addEventListener('submit', formSubmitPictureAdd);

const initialCards = [
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


initialCards.forEach(function addCard(item) {
    const gridElement = gridTemplate.cloneNode(true);//клонируем скелет карточки чтобы начать добавлять в нее элементы
    gridElement.querySelector('.grid__item').src = item.link;//добавили картинку
    gridElement.querySelector('.grid__header').textContent = item.name;//добавили подпись к картинке
    gridContainer.prepend(gridElement);//добавили полученную карточку в секцию
    gridContainer.querySelector('.grid__heart').addEventListener('click', showLike);
    gridContainer.querySelector('.grid__delete').addEventListener('click', delete_card);
});


function showLike(evt) {
    evt.target.classList.toggle('grid__heart-active');
}

function delete_card(evt) {
    evt.target.closest('.grid__box').remove();
}











