class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
  
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {headers: this._headers})
        .then(this._checkResponse);
    }

    setLike(cardId, isLike) {
        let method = 'DELETE';
        if (isLike)
            method = 'PUT';
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, { method: method, headers: this._headers})
        .then(this._checkResponse);
    }
  
    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {headers: this._headers})
        .then(this._checkResponse);
    }

    setDeleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, { method: 'DELETE', headers: this._headers})
        .then(this._checkResponse);
    }

    setAvatar(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, { method: 'PATCH', headers: this._headers,
            body: JSON.stringify({
                avatar: avatar})})
        .then(this._checkResponse);
    }

    setProfileInfo(name, about) {
        return fetch(`${this._baseUrl}users/me`, { method: 'PATCH', headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about})})
        .then(this._checkResponse);
    }

    setAddCard(name, link) {
        return fetch(`${this._baseUrl}cards`, { method: 'POST', headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link})})
        .then(this._checkResponse);
    }
}
  
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/',
    headers: {
      authorization: 'cf727bdb-2020-41f6-a216-3739201168c5',
      'Content-Type': 'application/json'
    }
}); 
 