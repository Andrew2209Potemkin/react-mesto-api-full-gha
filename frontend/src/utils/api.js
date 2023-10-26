class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  //Загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
      .then(this._checkAnswer);
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
      .then(this._checkAnswer);
  }

  //Обновление профиля пользователя
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(this._checkAnswer);
  }

  //Добавление новой карточки
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(this._checkAnswer);
  }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
      .then(this._checkAnswer);
  }

  //Отображение и удаление количества лайков
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
      .then(this._checkAnswer);
  }

  //Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
      .then(this._checkAnswer);
  }

  //Проверка вариантов ответа
  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.potemkin.students.nomoredomainsrocks.ru',
});

export { api };