const button = document.querySelector('.profile__button-small');
const close = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.text-form_name');
const jobInput = document.querySelector('.text-form_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup')
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
const formElement = popup.querySelector('.form');
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}
close.addEventListener('click', closePopup);
button.addEventListener('click', showPopup);
formElement.addEventListener('submit', formSubmitHandler);

