export function openPopup(popup, popupOpenedClass) {
  popup.classList.add(popupOpenedClass);
}

export function closePopup(popupOpenedClass) {
  const popup = document.querySelector('.' + popupOpenedClass);
  popup.classList.remove(popupOpenedClass);
}
