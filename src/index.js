import './pages/index.css';
import { createCard, handleLikeClick } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar, deleteCard, } from './components/api.js';

const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');
const viewImagePopup = document.querySelector('.popup_type_image');
const viewImageCloseButton = viewImagePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardPopup.querySelector('.popup__input_type_url');
const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_disabled', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__error_visible', 
};
const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmButton = confirmPopup.querySelector('.popup__button_confirm');
const popupImage = viewImagePopup.querySelector('.popup__image');
const popupCaption = viewImagePopup.querySelector('.popup__caption');
const renderLoading = ({ buttonElement, loadingText }) => {
  buttonElement.textContent = loadingText;
};

function handleProfileEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
  clearValidation(profileForm, validationConfig);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector); 
  renderLoading({ buttonElement: submitButton, loadingText: 'Сохранение...' });
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  updateUserInfo(newName, newAbout)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: 'Сохранить' });
    });
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(validationConfig.submitButtonSelector); 
  renderLoading({ buttonElement: submitButton, loadingText: 'Создание...' });
  const cardData = {
    name: cardNameInput.value, 
    link: cardLinkInput.value
  };
  addNewCard(cardData.name, cardData.link) 
    .then((newCard) => {
      const userId = newCard.owner._id;
      cardList.prepend(createCard(newCard, handleImageClick, handleLikeClick, handleDeleteClick, userId));
      closeModal(addCardPopup);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: 'Создать' });
    });
};

function handleImageClick(data) {
  popupImage.src = data.link; 
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(viewImagePopup);
};

function handleDeleteClick(cardId, cardElement) {
  openModal(confirmPopup);
  confirmButton.onclick = () => {
    renderLoading({ buttonElement: confirmButton, loadingText: 'Удаление...' });
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(confirmPopup);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading({ buttonElement: confirmButton, loadingText: 'Да' });
      });
  };
};

function createCardElement(cardData, userId) {
  return createCard(cardData, handleImageClick, handleLikeClick, handleDeleteClick, userId);
};

function renderCards(cards, userId) {
  cards.forEach((cardData) =>
    cardList.appendChild(createCardElement(cardData, userId))
  ); 
};

function renderUserInfo({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

function handleEditAvatarClick() {
  openModal(avatarPopup);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);
  renderLoading({ buttonElement: submitButton, loadingText: 'Сохранение...' });
  const newAvatar = avatarInput.value;
  updateAvatar(newAvatar)
    .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: 'Сохранить' });
    });
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    renderUserInfo(userInfo);
    renderCards(initialCards, userInfo._id);
  })
  .catch((err) => console.log(err));

profileEditButton.addEventListener('click', handleProfileEdit);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
profileForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup); 
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
});

addCardCloseButton.addEventListener('click', () => closeModal(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

viewImageCloseButton.addEventListener('click', () =>
  closeModal(viewImagePopup)
);

const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_url');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const editAvatarButton = document.querySelector('.profile__image');
editAvatarButton.addEventListener('click', handleEditAvatarClick);
avatarCloseButton.addEventListener('click', () => closeModal(avatarPopup));
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(profileForm, validationConfig);
