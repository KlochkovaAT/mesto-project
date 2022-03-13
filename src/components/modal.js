import { closePopup } from './utils';

const popups = document.querySelectorAll('.popup');

export function initPopupsListeners() {
  popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup')) {
        closePopup();
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup();
      }
    });
  });
}
