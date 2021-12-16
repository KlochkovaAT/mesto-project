function showProfileForm() {
  const title = document.querySelector('.profile__title').textContent;
  const description = document.querySelector('.profile__description').textContent;
  const inputContainer = document.querySelector('.form__input-container');
  const nameField = inputContainer.querySelector('[name="name"]');
  const descriptionField = inputContainer.querySelector('[name="description"]');
  const formElement = document.querySelector('.form[name="profile-form"]');
  const popup = formElement.closest('.popup');
  nameField.value = title;
  descriptionField.value = description;
  popup.classList.add('popup_opened');
}

function closePopUp() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

const editProfile = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
editProfile.addEventListener('click', showProfileForm);
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closePopUp);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const inputContainer = document.querySelector('.form__input-container');
  const title = inputContainer.querySelector('[name="name"]').value;
  const description = inputContainer.querySelector('[name="description"]').value;
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = title;
  profileDescription.textContent = description;
  closePopUp();
}

const formElement = document.querySelector('.form[name="profile-form"]');
formElement.addEventListener('submit', formSubmitHandler);

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

function createCardElement(name, link) {
  const templateElement = document.querySelector('#templateElement').content;
  const cardElement = templateElement.querySelector('.element').cloneNode(true);
  elementPicture = cardElement.querySelector('.element__picture');
  elementPicture.src = link;
  elementPicture.alt = name;
  elementPicture.addEventListener('click', function () {
    const imageContainer = document.querySelector('.popup__image-container');
    imageContainer.closest('.popup').classList.add('popup_opened');
    const image = imageContainer.querySelector('.popup__image');
    image.src = link;
    image.alt = name;
    imageContainer.querySelector('.popup__title').textContent = name;
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
  const elementsList = document.querySelector('.elements__list');
  const cardElement = createCardElement(card.name, card.link);
  elementsList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i = i + 1) {
  const card = initialCards[i];
  appendCard(card);
}

function showAddForm() {
  const formElement = document.querySelector('.form[name="add-form"]');
  formElement.querySelector('.form__input[name="element-title"]').value = '';
  formElement.querySelector('.form__input[name="link"]').value = '';
  const popup = formElement.closest('.popup');
  popup.classList.add('popup_opened');
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', showAddForm);

const formAdd = document.querySelector('.form[name="add-form"]');
formAdd.addEventListener('submit', formAddSubmitHandler);

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const formAdd = document.querySelector('.form[name="add-form"]');
  const name = formAdd.querySelector('.form__input[name="element-title"]').value;
  const link = formAdd.querySelector('.form__input[name="link"]').value;
  const elementsList = document.querySelector('.elements__list');
  const cardElement = createCardElement(name, link);
  elementsList.prepend(cardElement);
  closePopUp();
}
