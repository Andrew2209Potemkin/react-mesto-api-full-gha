export const BASE_URL = "https://api.potemkin.students.nomoredomainsrocks.ru";

function checkAnswer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
  }
};

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
  })
    .then(checkAnswer);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(checkAnswer);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(checkAnswer);
};

