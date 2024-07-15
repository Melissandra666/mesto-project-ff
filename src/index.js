import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, handleLikeClick, handleDeleteClick} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const popupCloseProfile = profilePopup.querySelector('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const popupCloseCard = addCardPopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const popupCloseImage = imagePopup.querySelector('.popup__close');
const formElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardPopup.querySelector('.popup__input_type_card-name');
const urlInput = addCardPopup.querySelector('.popup__input_type_url');

function handleImageClick(data) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(imagePopup);
};

function createCardElement(cardData) {
  return createCard(cardData, handleImageClick, handleLikeClick, handleDeleteClick);
};

function renderCards(cards) {
  cards.forEach((cardData) =>
    placesList.appendChild(createCardElement(cardData))
  );
};

function handleProfileEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: urlInput.value,
  };
  placesList.prepend(createCardElement(cardData));
  closeModal(addCardPopup);
  addCardForm.reset();
};

renderCards(initialCards);

profileEditButton.addEventListener('click', handleProfileEdit);

popupCloseProfile.addEventListener('click', () => 
  closeModal(profilePopup)
);

formElement.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener('click', () => 
  openModal(addCardPopup)
);

popupCloseCard.addEventListener('click', () => 
  closeModal(addCardPopup)
);

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

popupCloseImage.addEventListener('click', () =>
  closeModal(imagePopup)
);
