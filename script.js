//let popup = document.querySelector('.popup');
//let popup_opened = popup.querySelector('.popup_opened');



let button = document.querySelector('.profile__button-small');
let close = document.querySelector('.popup__button-close');


let popup = document.querySelector('.popup')

function showPopup() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
}

button.addEventListener('click', showPopup);


function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

close.addEventListener('click', closePopup);

console.log(typeof (document.querySelector('.popup__button-close')));

// Находим форму в DOM
let formElement = popup.querySelector('.form'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = popup.querySelector('.form__name-input');    // Воспользуйтесь инструментом .querySelector()
    let jobInput = popup.querySelector('.form__profession-input');// Воспользуйтесь инструментом .querySelector()

    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    /*console.log(nameInput.value);
    console.log(jobInput.value);*/
    // Получите значение полей из свойства value
    let profile__title = document.getElementById('profile__title');
    let profile__subtitle = document.getElementById('profile__subtitle');
    // Выберите элементы, куда должны быть вставлены значения полей

    profile__title.textContent = nameInput.value;
    profile__subtitle.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent

}
let form__button_save = document.querySelector('.form__button_save');
function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}
form__button_save.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

