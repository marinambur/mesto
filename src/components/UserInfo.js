
const popup = document.querySelector(".popup");
const formaElement = popup.querySelector(".form");
const nameInput = formaElement.querySelector(".text-form_name"); //находим поля форм
const jobInput = document.querySelector(".text-form_profession");
//import formProfileInfo from "../pages/index.js";
export class UserInfo {
    constructor(author) {
        console.log(author);
        this._name = author.profileAuthor;
        this._info = author.profileStatus;
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            info: this._info.textContent
        }
        console.log('userinfo v getuserinfo', userInfo);
        return userInfo;
    }

    setUserInfo(data) {
        console.log('data v setuserinfo', data);
        this._name.textContent = data.name;
        console.log(this._name.textContent);
        this._info.textContent = data.link;
        console.log(this._info.textContent);
    }
}