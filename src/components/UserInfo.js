
const userAvatar = document.querySelector('.profile__avatar');
export class UserInfo {
    constructor(author) {
        this._name = author.profileAuthor;
        this._info = author.profileStatus;
        this._avatar = author.profileAvatar;

    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            info: this._info.textContent,
            avatar: this._avatar.textContent,
        }
        return userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.about;
        this._avatar.src= data.avatar;
        userAvatar.src = data.avatar;
    }

}