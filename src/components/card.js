import { openModal } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, deleteCard, likeCard, showPopupImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const srcImage = (cardElement.querySelector(".card__image").src = item.link);
  const altImage = (cardElement.querySelector(".card__image").alt = `на фотографии ${item.name}`);

  const nameImage = (cardElement.querySelector(".card__title").textContent = item.name);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(cardElement);
    });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

    function likeCard(evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    }

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", showPopupImage);

function showPopupImage() {
    document.querySelector(".popup__image").setAttribute("src", item.link);
    document.querySelector(".popup__image").setAttribute("alt", item.name);
    document.querySelector(".popup__caption").textContent = item.name;
  }

  const popupImage = document.querySelector(".popup_type_image");

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openModal(popupImage);
    });

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
