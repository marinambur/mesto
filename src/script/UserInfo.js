
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_profession");
export class UserInfo {
    constructor(name, info) {
        this._name = name;
        this._info = info;
    }
    getUserInfo() {
        nameInput.value = this._name.textContent;
        jobInput.value = this._info.textContent;
    }
    setUserInfo() {
        this._name.textContent = nameInput.value;
        this._info.textContent = jobInput.value;
    }
}