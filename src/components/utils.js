let popupOpened;
const popupOpenedClass = 'popup_opened';

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

export function openPopup(popup) {
  popupOpened = popup;
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keydown', closeByEscape);
}

export function closePopup() {
  if (popupOpened) {
    popupOpened.classList.remove(popupOpenedClass);
    popupOpened = null;
  }
  document.removeEventListener('keydown', closeByEscape);
}
