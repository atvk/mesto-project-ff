const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "c86f4c20-586e-4dd7-9d6e-a741f3f74fae",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    (res) => checkResponse(res)
  );
};

export const updateProfileInfo = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const updateProfileAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    (res) => checkResponse(res)
  );
};

export const postCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const delCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const putLike = (data) => {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};

export const delLike = (data) => {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};
