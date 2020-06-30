export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error${res.status}`);
            });
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error${res.status}`);
            });
    }

    uploadUserInfo(userName, userJob) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: userName,
                about: userJob,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error${res.status}`);
            });
    }

    toAddNewCard(cardName, cardLink) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error${res.status}`);
            });
    }

      /* deleteCard(id) {
            return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${this.id}`,{
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`error${res.status}`);
                });
        }*/

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${id}`,{
            method: 'DELETE',
            baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
            headers: {
                authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9',
                'Content-Type': 'application/json'
            },

        })
            //.then (this._element.remove())
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error${res.status}`);
            });

        //api.deleteCard()
        //

    };


    putLike(cardId) {

        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => data);
    }

    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => data);
    }


    _writeUserAvatar (data) {
        document.querySelector('.profile__avatar').src = data.avatar;
    }

    setUserAvatar (userAvatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: 'a737011d-02cf-4531-980a-f0cf56195ed9',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: userAvatar
                })
            }
        )


            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => this._writeUserAvatar(data))

    }
}