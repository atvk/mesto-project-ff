import { delCard } from "../components/api.js";
import { putLike } from "../components/api.js";
import { delLike } from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(cardId, card) {
  delCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(cardData, likeСounter, likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    delLike(cardData)
      .then((cardData) => {
        likeСounter.textContent = cardData.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardData)
      .then((cardData) => {
        likeСounter.textContent = cardData.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function createCard(
  cardData,
  userId,
  { deleteCard, likeCard, openImagePopup }
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeСounter = cardElement.querySelector(".count-like");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const isLiked = cardData.likes.some((like) => userId === like._id);

  cardImage.src = cardData.link;
  cardImage.alt = `на фотографии ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeСounter.textContent = cardData.likes.length;

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(cardData, likeСounter, likeButton);
  });

  if (userId !== cardData.owner._id) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardData._id, cardElement);
    });
  }

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  });

  return cardElement;
}
