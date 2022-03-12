export function createCardElement(
  templateElement,
  name,
  link,
  likeCount,
  cardElementCss,
  showCard,
  isTrashAvailable,
  showConfirm,
  cardId,
  deleteLike,
  addLike,
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
    // evt.target.classList.toggle(cardElementCss.elementHeartActiveClass);
    if (evt.target.classList.contains(cardElementCss.elementHeartActiveClass)) {
      evt.target.classList.remove(cardElementCss.elementHeartActiveClass);
      deleteLike(cardId).then((newLikeCount) => {
        elementLikeCount.textContent = newLikeCount;
      });
    } else {
      evt.target.classList.add(cardElementCss.elementHeartActiveClass);
      addLike(cardId).then((newLikeCount) => {
        elementLikeCount.textContent = newLikeCount;
      });
    }
  });
  const elementTrash = cardElement.querySelector(cardElementCss.elementTrashSelector);
  elementTrash.addEventListener('click', function (evt) {
    //const element = evt.target.closest(cardElementCss.elementSelector);
    // element.remove();
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

export function removeCardElemenet(cardId) {
  const cardElement = document.querySelector(`[data-id="${cardId}"]`);
  cardElement.remove();
}
