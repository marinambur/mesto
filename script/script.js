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
const pictureLink = document.querySelector('.grid__picture');
const picturePopUp = document.querySelector('.picture-big');
const formElement = popup.querySelector('.form');
const formPictureAdd = document.querySelector('.form-add');
const imageBig = document.querySelector('.picture-big__item');//нашли картинку в будущем поп-апе 
const imageHeader = document.querySelector('.picture-big__name');//нашли название в будущем попапе, который сейчас откроем
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
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}//нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап (переиспользуется та же функция, что и в кнопке-крестик)
function formSubmitPictureAdd(evt) {//добавляем картинку и название из данных формы
    evt.preventDefault();
    const gridElement = gridTemplate.cloneNode(true);//клонируем скелет карточки чтобы начать добавлять в нее элементы
    gridElement.querySelector('.grid__header').textContent = placeInput.value;//то, что в 1 поле формы - это название картинки
    gridElement.querySelector('.grid__item').src = linkInput.value;//во 2 поле адрес ссылки
    gridContainer.prepend(gridElement);//добавили картинку впереди остальных
    closePictureAdd();//закрыли форму добавления картинки
    gridContainer.querySelector('.grid__heart').addEventListener('click', showLike);//слушатель сердечка
    gridContainer.querySelector('.grid__delete').addEventListener('click', deleteCard);//слушатель удаления картинки
    gridContainer.querySelector('.grid__picture').addEventListener('click', showPictureBig);//слушатель открывания большой картинки
   }
initialCards.forEach(function addCard(item) {//добавление картинок из цикла
    const gridElement = gridTemplate.cloneNode(true);//клонируем скелет карточки чтобы начать добавлять в нее элементы
    gridElement.querySelector('.grid__item').src = item.link;//добавили картинку
    gridElement.querySelector('.grid__header').textContent = item.name;//добавили подпись к картинке
    gridContainer.prepend(gridElement);//добавили полученную карточку в секцию
    gridContainer.querySelector('.grid__heart').addEventListener('click', showLike);//опять все слушатели
    gridContainer.querySelector('.grid__delete').addEventListener('click', deleteCard);
    gridContainer.querySelector('.grid__picture').addEventListener('click', showPictureBig);
});
function showLike(evt) {//функция закрашивания сердечка по нажатию
    evt.target.classList.toggle('grid__heart-active');//event target помогает понять какое сердечко красить
}

function deleteCard(evt) {//функция удаления карточки
    evt.target.closest('.grid__box').remove();//event target помогает удалить карточку, closest помогает найти родителя именно этого мусорного ведра именно этой карточки
}

function showPictureBig(evt) {//добавляем поп-ап увеличения той картинки, на которую мы нажали
    picturePopUp.classList.add('picture-big_opened');//нажали на картинку карточки (она же ссылка) - добавили класс открывания поп-апа
    imageBig.src = evt.target.src;//адрес будущей картинки это адрес картинки в карточке 
    imageHeader.textContent = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;
}

function closePictureAdd() {
    pictureAdd.classList.remove('picture-add_opened');
}
function closePictureBig(evt) {//закрываем большой поп-ап с картинкой 
    evt.target.closest('.picture-big').classList.remove('picture-big_opened');
}

close.addEventListener('click', closePopup);//слушатели событий по кликам на кнопки, запускают функции
closePic.addEventListener('click', closePictureAdd);
button.addEventListener('click', showPopup);
plus.addEventListener('click', showPictureAdd);
formElement.addEventListener('submit', formSubmitHandler);
formPictureAdd.addEventListener('submit', formSubmitPictureAdd);
picturePopUp.querySelector('.popup__button-close').addEventListener('click', closePictureBig);



