import { deleteCard, likeCard, unlikeCard } from './api.js';

function handleLikeClick(cardId, likeButton, likeCounter) { 
  if (likeButton.classList.contains('card__like-button_is-active')) { 
    unlikeCard(cardId) 
      .then((updatedCard) => { 
        likeButton.classList.remove('card__like-button_is-active'); 
        likeCounter.textContent = 
          updatedCard.likes.length > 0 ? updatedCard.likes.length : ''; 
        if (updatedCard.likes.length === 0) { 
          likeCounter.classList.remove('card__like-counter_is-active'); 
        } 
      }) 
      .catch((err) => console.log(err)); 
  } else { 
    likeCard(cardId) 
      .then((updatedCard) => { 
        likeButton.classList.add('card__like-button_is-active'); 
        likeCounter.textContent = updatedCard.likes.length;  
        likeCounter.classList.add('card__like-counter_is-active'); 
      }) 
      .catch((err) => console.log(err));  
  } 
}

function handleDeleteClick(evt, cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(confirmPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading({ buttonElement: confirmButton, loadingText: "Да" });
    });
};

function createCardElement(template, data, handleImageClick, handleLikeClick, handleDeleteClick, userId) {
  const cardElement = template.querySelector('.card').cloneNode(true); 
  cardElement.dataset.cardId = data._id;
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length;
  if (data.likes.length > 0) {
    likeCounter.classList.add('card__like-counter_is-active');
  }
  if (data.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  cardImage.addEventListener('click', () => handleImageClick(data));
  likeButton.addEventListener('click', () => handleLikeClick(data._id, likeButton, likeCounter));
  if (data.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => handleDeleteClick(evt, data._id, cardElement));
  } else {
    deleteButton.style.display = 'none'; 
  }
  return cardElement; 
}

function createCard(data, handleImageClick, handleLikeClick, handleDeleteClick, userId) {
  const template = document.getElementById('card-template').content; 
  return createCardElement(template, data, handleImageClick, handleLikeClick, handleDeleteClick, userId);
};

export { createCard, handleLikeClick, handleDeleteClick };
