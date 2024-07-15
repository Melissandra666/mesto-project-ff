function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};

function handleDeleteClick(evt) {
  evt.target.closest(".card").remove();
};

function createCardElement(template, data, handleImageClick, handleLikeClick, handleDeleteClick) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardImage.addEventListener("click", () =>
    handleImageClick(data)
  );
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteClick);
  return cardElement;
};

function createCard(data, handleImageClick, handleLikeClick, handleDeleteClick) {
  const template = document.getElementById("card-template").content; 
  return createCardElement(template, data, handleImageClick, handleLikeClick, handleDeleteClick);
};

export { createCard, handleLikeClick, handleDeleteClick };