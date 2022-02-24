let popupOpenedClassModalModule;

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupOpenedClassModalModule);
  }
}

export function openPopup(popup, popupOpenedClass) {
  popupOpenedClassModalModule = popupOpenedClass;
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keydown', closeByEscape);
}

export function closePopup(popupOpenedClass) {
  popupOpenedClassModalModule = popupOpenedClass;
  const popup = document.querySelector('.' + popupOpenedClass);
  popup.classList.remove(popupOpenedClass);
  document.removeEventListener('keydown', closeByEscape);
}
