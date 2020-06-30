import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this.submitForm = submitForm;
    }

    _setEventListeners() {
        this._submit = this._setSubmitForm.bind(this);
        this.popupSelector.addEventListener('submit', this._submit, {once: true});
        super._setEventListeners();
    }

    _setSubmitForm(evt) {
        evt.preventDefault();
        location.reload();
        this.submitForm(this._getInputValues());
    }


  /* whichValues() {

        const item = {
            avatar: this.popupSelector.querySelector(".text-form__avatar").value,

        }
        return (item)
    }*/

    /*_getInputValues() {

            const item = {
                name: this.popupSelector.querySelector(".text-form_name").value,
                link: this.popupSelector.querySelector(".text-form_subject").value
            }
            return item
        }
*/
    _getInputValues() {
            // достаём все элементы полей
            this._inputList = this.popupSelector.querySelectorAll('.text-form');
            // создаём пустой объект
            this._formValues = {};
            // добавляем в этот объет значения всех полей
            this._inputList.forEach(input => {
                this._formValues[input.name] = input.value;
            });
console.log(this._formValues)
            // возвращаем объект значений
            return this._formValues;

    }


        close() {
        this.popupSelector.removeEventListener('submit', this.submitForm);
        this.popupSelector.querySelector('form').reset();//по условию задания close() должен тут перезаписываться и сбрасывать форму
        super.close();
    }
}