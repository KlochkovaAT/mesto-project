import { closePopup, openPopup } from './utils.js';
import { deleteCard, deleteLike, putLike } from './api.js';
import { popupConfirm } from './const';

const popupImage = document.querySelector('#popupImage');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title');

const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('#templateElement').content;
const cardElementCss = {
  elementSelector: '.element',
  elementPictureSelector: '.element__picture',
  elementTitleSelector: '.element__title',
  elementHeartSelector: '.element__heart',
  elementHeartActiveClass: 'element__heart_active',
  elementTrashSelector: '.element__trash',
  elementLikeCountSelector: '.element__like-count',
  elementTrashAvailable: 'element__trash_avaliable',
};
let currentCardForDelete;

const showCard = (name, link) => {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
};

const showConfirm = (cardId) => {
  openPopup(popupConfirm);
  currentCardForDelete = cardId;
};

export function prependCard(name, link, likeCount, isTrashAvailable, cardId, isLiked) {
  const cardElement = createCardElement(
    name,
    link,
    likeCount,
    isTrashAvailable,
    cardId,
    isLiked
  );
  elementsList.prepend(cardElement);
}

export function appendCard(name, link, likeCount, isTrashAvailable, cardId, isLiked) {
  const cardElement = createCardElement(
    name,
    link,
    likeCount,
    isTrashAvailable,
    cardId,
    isLiked
  );
  elementsList.append(cardElement);
}

function createCardElement(
  name,
  link,
  likeCount,
  isTrashAvailable,
  cardId,
  isLiked
) {
  const cardElement = templateElement.querySelector(cardElementCss.elementSelector).cloneNode(true);
  cardElement.dataset.id = cardId;
  const elementPicture = cardElement.querySelector(cardElementCss.elementPictureSelector);
  elementPicture.src = link;
  elementPicture.alt = name;
  elementPicture.addEventListener('click', function () {
    showCard(name, link);
  });
  const elementLikeCount = cardElement.querySelector(cardElementCss.elementLikeCountSelector);
  const elementLike = cardElement.querySelector(cardElementCss.elementHeartSelector);
  elementLikeCount.textContent = likeCount;
  cardElement.querySelector(cardElementCss.elementTitleSelector).textContent = name;
  elementLike.addEventListener('click', function (evt) {
    if (evt.target.classList.contains(cardElementCss.elementHeartActiveClass)) {
      deleteLike(cardId)
        .then((card) => {
          elementLikeCount.textContent = card.likes.length;
          evt.target.classList.remove(cardElementCss.elementHeartActiveClass);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(cardId)
        .then((card) => {
          elementLikeCount.textContent = card.likes.length;
          evt.target.classList.add(cardElementCss.elementHeartActiveClass);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const elementTrash = cardElement.querySelector(cardElementCss.elementTrashSelector);
  elementTrash.addEventListener('click', function (evt) {
    showConfirm(cardId);
  });
  if (isTrashAvailable) {
    elementTrash.classList.add(cardElementCss.elementTrashAvailable);
  }

  if (isLiked) {
    elementLike.classList.add(cardElementCss.elementHeartActiveClass);
  }

  return cardElement;
}

export function removeCurrentCardElement() {
  deleteCard(currentCardForDelete)
    .then(() => {
      const cardElement = document.querySelector(`[data-id="${currentCardForDelete}"]`);
      cardElement.remove();
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
}
