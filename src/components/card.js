import { delCard } from "../components/api.js";
import { putLike } from "../components/api.js";
import { delLike } from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(card) {
  card.remove();
}

export function likeCard(cardData, likeСounter, likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    delLike(cardData).then((cardData) => {
      likeСounter.textContent = cardData.likes.length;
      likeButton.classList.remove("card__like-button_is-active");
    });
  } else {
    putLike(cardData).then((cardData) => {
      likeСounter.textContent = cardData.likes.length;
      likeButton.classList.add("card__like-button_is-active");
    });
  }
}

export function createCard(
  cardData,
  { deleteCard, likeCard, handleImageClick }
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeСounter = cardElement.querySelector(".count-like");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = `на фотографии ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  if (cardData.likes.some((like) => cardData.myId === like._id)) {
    likeСounter.textContent = cardData.likes.length;
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeСounter.textContent = cardData.likes.length;
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(cardData, likeСounter, likeButton);
  });

  if (cardData.myId !== cardData.usersId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      delCard(cardData._id).then(() => {
        deleteCard(cardElement);
      });
    });
  }

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return cardElement;
}
