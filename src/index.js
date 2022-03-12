import { enableValidation, resetValidation } from './components/validate.js';
import { createCardElement, removeCardElemenet } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { GetUser, PatchUser, GetCards, PostCard, DeleteCard, DeleteLike, PutLike, PatchAvatar } from './components/api.js';
import './pages/index.css';

const cardElementCss = {
  elementSelector: '.element',
  elementPictureSelector: '.element__picture',
  elementTitleSelector: '.element__title',
  elementHeartSelector: '.element__heart',
  elementHeartActiveClass: 'element__heart_active',
  elementTrashSelector: '.element__trash',
  elementLikeCountSelector: '.element__like-count',
  elementTrashAvailable: 'element__trash_avaliable'
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
const profileFormElementSubmit = profileFormElement.querySelector('.form__submit');
const profileFormInputContainer = popupProfile.querySelector('.form__input-container');
const profileFormNameField = profileFormInputContainer.querySelector('[name="name-input"]');
const profileFormDescriptionField = profileFormInputContainer.querySelector('[name="description"]');

const popupImage = document.querySelector('#popupImage');
const imageContainer = popupImage.querySelector('.popup__image-container');
const image = imageContainer.querySelector('.popup__image');
const imageTitle = imageContainer.querySelector('.popup__title');

const popupAddCard = document.querySelector('#popupAddCard');
const formAdd = popupAddCard.querySelector('.form');
const formAddSubmit = formAdd.querySelector('.form__submit');
const cardTitle = popupAddCard.querySelector('.form__input[name="element-title"]');
const cardLink = popupAddCard.querySelector('.form__input[name="link"]');

const elementsList = document.querySelector('.elements__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar =  document.querySelector('.profile__avatar');
const profileAvatarEdit = document.querySelector('.profile__avatar-edit');
const editProfile = document.querySelector('.profile__edit-button');
let currentUserId;
let currentCardForDelete;

const popupConfirm = document.querySelector('#popupConfirm');
const formConfirm = popupConfirm.querySelector('.form');

const popupEditAvatar = document.querySelector('#popupEditAvatar');
const formEditAvatar = popupEditAvatar.querySelector('.form');
const formEditAvatarSubmit = formEditAvatar.querySelector('.form__submit');
const avatarLink = formEditAvatar.querySelector('.form__input[name="link"]');

function updateProfileData(title, description, avatar) {
  profileTitle.textContent = title;
  profileDescription.textContent = description;
  profileAvatar.src = avatar;
}

function updateAvatar(avatar) {
  profileAvatar.src = avatar;
}

profileAvatar.addEventListener('mouseover', function() {
  profileAvatarEdit.classList.add('profile__avatar-edit_active');
})

profileAvatarEdit.addEventListener('mouseout', function() {
  profileAvatarEdit.classList.remove('profile__avatar-edit_active');
})

profileAvatarEdit.addEventListener('click', function() {
  avatarLink.value = '';
  resetValidation(formEditAvatar, validationCssClasses);
  openPopup(popupEditAvatar, popupOpenedClass);
})

formEditAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  formEditAvatarSubmit.value = 'Сохранение...';
  PatchAvatar(avatarLink.value, updateAvatar)
  .finally(() => {
    closePopup(popupOpenedClass);
    formEditAvatarSubmit.value = 'Сохранить';
  })
});

GetUser(updateProfileData)
  .then((userId) => {
    currentUserId = userId;
    console.log(currentUserId);
    GetCards(appendCard, currentUserId);
  });

editProfile.addEventListener('click', function () {
  profileFormNameField.value = profileTitle.textContent;
  profileFormDescriptionField.value = profileDescription.textContent;
  resetValidation(profileFormElement, validationCssClasses);
  openPopup(popupProfile, popupOpenedClass);
});

profileFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileFormElementSubmit.value = 'Сохранение...';
  PatchUser(profileFormNameField.value, profileFormDescriptionField.value, updateProfileData)
  .finally(() => {
    closePopup(popupOpenedClass);
    profileFormElementSubmit.value = 'Сохранить';
  })
});

formConfirm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  console.log(currentCardForDelete);
  DeleteCard(currentCardForDelete)
    .then(()  => {
      removeCardElemenet(currentCardForDelete);
    });
  closePopup(popupOpenedClass);
});

const templateElement = document.querySelector('#templateElement').content;

const showCard = (name, link) => {
  image.src = link;
  image.alt = name;
  imageTitle.textContent = name;
  openPopup(popupImage, popupOpenedClass);
};

const showConfirm = (cardId) => {
  openPopup(popupConfirm, popupOpenedClass);
  currentCardForDelete = cardId;
};

function prependCard(name, link, likeCount, isTrashAvailable, cardId, isLiked) {
  const cardElement = createCardElement(templateElement, name, link, likeCount, cardElementCss, showCard, isTrashAvailable, showConfirm, cardId, DeleteLike, PutLike, isLiked);
  elementsList.prepend(cardElement);
}

function appendCard(name, link, likeCount, isTrashAvailable, cardId, isLiked) {
  const cardElement = createCardElement(templateElement, name, link, likeCount, cardElementCss, showCard, isTrashAvailable, showConfirm, cardId, DeleteLike, PutLike, isLiked);
  elementsList.append(cardElement);
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  cardTitle.value = '';
  cardLink.value = '';
  resetValidation(formAdd, validationCssClasses);
  openPopup(popupAddCard, popupOpenedClass);
});

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  formAddSubmit.value = 'Сохранение...';
  PostCard(cardTitle.value, cardLink.value, prependCard)
  .finally(() => {
    closePopup(popupOpenedClass);
    formAddSubmit.value = 'Сохранить';
  })
});

const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupOpenedClass);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popupOpenedClass);
    }
  });
});

enableValidation(validationCssClasses);
