export function createCardElement(templateElement, name, link, cardElementCss, showCard) {
  const cardElement = templateElement.querySelector(cardElementCss.elementSelector).cloneNode(true);
  const elementPicture = cardElement.querySelector(cardElementCss.elementPictureSelector);
  elementPicture.src = link;
  elementPicture.alt = name;
  elementPicture.addEventListener('click', showCard);
  cardElement.querySelector(cardElementCss.elementTitleSelector).textContent = name;
  cardElement.querySelector(cardElementCss.elementHeartSelector).addEventListener('click', function (evt) {
    evt.target.classList.toggle(cardElementCss.elementHeartActiveClass);
  });
  cardElement.querySelector(cardElementCss.elementTrashSelector).addEventListener('click', function (evt) {
    const element = evt.target.closest(cardElementCss.elementSelector);
    element.remove();
  });
  return cardElement;
}
