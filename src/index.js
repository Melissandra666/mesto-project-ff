import './pages/index.css';
import { createCard, handleLikeClick, handleDeleteClick } from './components/card.js';
import { initialCards } from './components/cards.js'; 
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './components/api.js';
 
const placesList = document.querySelector('.places__list'); 
const profileEditButton = document.querySelector('.profile__edit-button'); 
const profilePopup = document.querySelector('.popup_type_edit'); 
const popupCloseProfile = profilePopup.querySelector('.popup__close'); 
const profileAddButton = document.querySelector('.profile__add-button'); 
const addCardPopup = document.querySelector('.popup_type_new-card'); 
const popupCloseCard = addCardPopup.querySelector('.popup__close'); 
const imagePopup = document.querySelector('.popup_type_image'); 
const popupCloseImage = imagePopup.querySelector('.popup__close'); 
const profileForm = profilePopup.querySelector('.popup__form'); 
const nameInput = profilePopup.querySelector('.popup__input_type_name'); 
const jobInput = profilePopup.querySelector('.popup__input_type_description'); 
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const addCardForm = addCardPopup.querySelector('.popup__form'); 
const cardNameInput = addCardPopup.querySelector('.popup__input_type_card-name'); 
const urlInput = addCardPopup.querySelector('.popup__input_type_url'); 
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_url');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const editAvatarButton = document.querySelector('.profile__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupImage = imagePopup.querySelector('.popup__image');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
 
function createCardElement(cardData, userId) { 
  return createCard(cardData, handleImageClick, handleLikeClick, handleDeleteClick, userId); 
}; 
 
function renderCards(cards, userId) { 
  cards.forEach((cardData) => 
    placesList.appendChild(createCardElement(cardData, userId)) 
  ); 
}; 

function renderUserInfo({ name, about, avatar }) {
  profileTitle.textContent = name; 
  profileDescription.textContent = about; 
  editAvatarButton.style.backgroundImage = `url(${avatar})`; 
}
 
function handleProfileEdit() { 
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
  openModal(profilePopup); 
  clearValidation(profileForm, validationConfig);
}; 
 
function handleProfileFormSubmit(evt) { 
  evt.preventDefault(); 
  const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  updateUserInfo(newName, newAbout)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
}; 
 
function handleImageClick(data) { 
  const popupImage = imagePopup.querySelector('.popup__image'); 
  const popupCaption = imagePopup.querySelector('.popup__caption'); 
  popupImage.src = data.link; 
  popupImage.alt = data.name; 
  popupCaption.textContent = data.name; 
  openModal(imagePopup); 
}; 

function handleAddCardFormSubmit(evt) { 
  evt.preventDefault(); 
  const submitButton = addCardForm.querySelector(validationConfig.submitButtonSelector);
  const cardData = { 
    name: cardNameInput.value, 
    link: urlInput.value, 
  }; 
  addNewCard(cardData.name, cardData.link)
  .then((newCard) => {
    const userId = newCard.owner._id;
    placesList.prepend(createCard(newCard, handleImageClick, handleLikeClick, handleDeleteClick, userId));
    closeModal(addCardPopup); 
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig); 
  })
  .catch((err) => console.log(err))
}; 

function handleEditAvatarClick() {
  openModal(avatarPopup);
  avatarForm.reset(); 
  clearValidation(avatarForm, validationConfig); 
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);
  const newAvatar = avatarInput.value;
  updateAvatar(newAvatar) 
    .then((userInfo) => {
      editAvatarButton.style.backgroundImage = `url(${userInfo.avatar})`; 
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err)) 
}
 
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    renderUserInfo(userInfo);
    renderCards(initialCards, userInfo._id);
  })
  .catch((err) => console.log(err));


profileEditButton.addEventListener('click', handleProfileEdit); 
popupCloseProfile.addEventListener('click', () =>  closeModal(profilePopup)); 
profileForm.addEventListener('submit', handleProfileFormSubmit); 
 
profileAddButton.addEventListener('click', () => {
  openModal(addCardPopup);
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
});

popupCloseCard.addEventListener('click', () => closeModal(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

profileAddButton.addEventListener('click', () =>  openModal(addCardPopup)); 
 
popupCloseCard.addEventListener('click', () =>  closeModal(addCardPopup)); 
 
addCardForm.addEventListener('submit', handleAddCardFormSubmit); 
 
popupCloseImage.addEventListener('click', () => closeModal(imagePopup)); 
 
editAvatarButton.addEventListener('click', handleEditAvatarClick);
avatarCloseButton.addEventListener('click', () => closeModal(avatarPopup));
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);
