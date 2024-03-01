const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(card) {
  card.remove();
}

export function likeCard(card) {
  card.target.classList.toggle("card__like-button_is-active");
}

export function createCard(card, { deleteCard, likeCard, handleImageClick }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = card.link;
  cardImage.alt = `на фотографии ${card.name}`;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener("click", ()=>{deleteCard(cardElement)});

  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", ()=>{handleImageClick(card)});
 
  return cardElement;
}
