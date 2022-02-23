import { enableValidation, resetValidation } from './components/validate.js';
import { createCardElement } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import './pages/index.css';

const cardElementCss = {
  elementSelector: '.element',
  elementPictureSelector: '.element__picture',
  elementTitleSelector: '.element__title',
  elementHeartSelector: '.element__heart',
  elementHeartActiveClass: 'element__heart_active',
  elementTrashSelector: '.element__trash',
};

const validationCssClasses = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

const popupOpenedClass = 'popup_opened';

const popupProfile = document.querySelector('#popupProfile');
const profileFormElement = popupProfile.querySelector('.form');
const profileFormInputContainer = popupProfile.querySelector('.form__input-container');
const profileFormNameField = profileFormInputContainer.querySelector('[name="name-input"]');
const profileFormDescriptionField = profileFormInputContainer.querySelector('[name="description"]');

const popupImage = document.querySelector('#popupImage');
const imageContainer = popupImage.querySelector('.popup__image-container');
const image = imageContainer.querySelector('.popup__image');
const imageTitle = imageContainer.querySelector('.popup__title');

const popupAddCard = document.querySelector('#popupAddCard');
const formAdd = popupAddCard.querySelector('.form');
const cardTitle = popupAddCard.querySelector('.form__input[name="element-title"]');
const cardLink = popupAddCard.querySelector('.form__input[name="link"]');

const elementsList = document.querySelector('.elements__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfile = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');

editProfile.addEventListener('click', function () {
  profileFormNameField.value = profileTitle.textContent;
  profileFormDescriptionField.value = profileDescription.textContent;
  resetValidation(profileFormElement, validationCssClasses);
  openPopup(popupProfile, popupOpenedClass);
});

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', function () {
    closePopup(popupOpenedClass);
  });
}

profileFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileFormNameField.value;
  profileDescription.textContent = profileFormDescriptionField.value;
  closePopup(popupOpenedClass);
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const templateElement = document.querySelector('#templateElement').content;

const showCard = (name, link) => {
  image.src = link;
  image.alt = name;
  imageTitle.textContent = name;
  openPopup(popupImage, popupOpenedClass);
};

initialCards.forEach(function (card) {
  const cardElement = createCardElement(templateElement, card.name, card.link, cardElementCss, showCard);
  elementsList.append(cardElement);
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  cardTitle.value = '';
  cardLink.value = '';
  resetValidation(formAdd, validationCssClasses);
  openPopup(popupAddCard, popupOpenedClass);
});

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardElement = createCardElement(templateElement, cardTitle.value, cardLink.value, cardElementCss, showCard);
  elementsList.prepend(cardElement);
  closePopup(popupOpenedClass);
});

const popup = document.querySelectorAll('.popup');
for (let i = 0; i < popup.length; i++) {
  popup[i].addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupOpenedClass);
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupOpenedClass);
    }
  });
}

enableValidation(validationCssClasses);
