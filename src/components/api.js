const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '74327f87-7f6a-45e4-8ce4-149141926891',
    'Content-Type': 'application/json',
  },
};

const getResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function GetUser(updateUser) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(getResult)
    .then((result) => {
      updateUser(result.name, result.about, result.avatar);
      return result._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function PatchUser(name, about, updateUser) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(getResult)
    .then((user) => {
      updateUser(user.name, user.about, user.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function PatchAvatar(url, updateUser) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then(getResult)
    .then((user) => {
      updateUser(user.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function GetCards(addCard, currentUserId) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(getResult)
    .then((result) => {
      console.log(result);
      result.forEach((element) => {
        const showTrash = currentUserId === element.owner._id;
        let isLiked = false;
        element.likes.forEach((like) => {
          if (like._id === currentUserId) {
            isLiked = true;
          }
        });
        addCard(element.name, element.link, element.likes.length, showTrash, element._id, isLiked);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function PostCard(name, link, addCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(getResult)
    .then((card) => {
      addCard(card.name, card.link, card.likes.length, true, card._id);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function DeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .catch((err) => {
    console.log(err);
  });
}

export function PutLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(getResult)
    .then((card) => {
      return card.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function DeleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(getResult)
    .then((card) => {
      return card.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
