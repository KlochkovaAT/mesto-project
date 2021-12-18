const popupProfile = document.querySelector('#popupProfile');
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileFormInputContainer = popupProfile.querySelector('.form__input-container');
const profileFormNameField = profileFormInputContainer.querySelector('[name="name"]');
const profileFormDescriptionField = profileFormInputContainer.querySelector('[name="description"]');


const popupAddCard = document.querySelector('#popupAddCard');
const cardTitle = popupAddCard.querySelector('.form__input[name="element-title"]');
const cardLink = popupAddCard.querySelector('.form__input[name="link"]');
const elementsList = document.querySelector('.elements__list');

const popupImage = document.querySelector('#popupImage');
const imageContainer = popupImage.querySelector('.popup__image-container');
const image = imageContainer.querySelector('.popup__image');
const imageTitle = imageContainer.querySelector('.popup__title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function showProfileForm() {
  profileFormNameField.value = profileTitle.textContent;
  profileFormDescriptionField.value = profileDescription.textContent;
  openPopup(popupProfile);
}

const editProfile = document.querySelector('.profile__edit-button');
editProfile.addEventListener('click', showProfileForm);

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close');
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closePopup);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileFormNameField.value;
  profileDescription.textContent = profileFormDescriptionField.value;
  closePopup();
}

const profileFormElement = popupProfile.querySelector('.form');
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

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

function createCardElement(name, link) {
  const cardElement = templateElement.querySelector('.element').cloneNode(true);
  const elementPicture = cardElement.querySelector('.element__picture');
  elementPicture.src = link;
  elementPicture.alt = name;
  elementPicture.addEventListener('click', function () {
    image.src = link;
    image.alt = name;
    imageTitle.textContent = name;
    openPopup(popupImage);
  });
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
    const element = evt.target.closest('.element');
    element.remove();
  });
  return cardElement;
}

function appendCard(card) {

  const cardElement = createCardElement(card.name, card.link);
  elementsList.append(cardElement);
}

initialCards.forEach(function (card) {
  appendCard(card);
});

function showAddForm() {
  cardTitle.value = '';
  cardLink.value = '';
  openPopup(popupAddCard);
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', showAddForm);

const formAdd = popupAddCard.querySelector('.form');
formAdd.addEventListener('submit', formAddSubmitHandler);

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = createCardElement(cardTitle.value, cardLink.value);
  elementsList.prepend(cardElement);
  closePopup();
}
