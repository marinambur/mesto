const button = document.querySelector('.profile__button-small');/*находим кнопки*/
const close = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.text-form_name');//находим поля форм
const jobInput = document.querySelector('.text-form_profession');
const profileTitle = document.querySelector('.profile__title');//здесь и далее находим заголовки, куда будут перезаписываться данные, введенные в форму, а также части формы
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup')
const formElement = popup.querySelector('.form');
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}//открываем форму при нажатии на кнопку-карандаш. в форме в этот момент сохраненные значения заголовков (если нажать на крест, этих данных не будет в форме при открытии, для этого value)

function closePopup() {
    popup.classList.remove('popup_opened');
}//нажимаем на крест, введенные в форму данные не сохраняются, только исчезает попап

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}//нажимаем на "сохранить", данные из формы сохраняются в заголовки, а потом закрывается попап (переиспользуется та же функция, что и в кнопке-крестик)

close.addEventListener('click', closePopup);//слушатели событий по кликам на кнопки, запускают функции
button.addEventListener('click', showPopup);
formElement.addEventListener('submit', formSubmitHandler);

