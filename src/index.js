import "../src/style/index.css";
import { initialCards } from "./components/cards.js";
import { openModal } from "./components/modal.js";
import { closeModal } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";

// Контейнер с картинками

const placesList = document.querySelector(".places__list");

// Профайл

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupСontentProfile = popupEditProfile.querySelector(".popup__content");
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile =popupСontentProfile.querySelector(".popup__close");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Картинка

const popupImage = document.querySelector(".popup_type_image");
const popupСontentImage = popupImage.querySelector(
  ".popup__content_content_image"
);
const buttonClosePopupImage = popupСontentImage.querySelector(".popup__close");

// Добавление карточки

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupСontentCard = popupAddCard.querySelector(".popup__content");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = popupСontentCard.querySelector(".popup__close");

const formCardPopup = popupСontentCard.querySelector(".popup__form");
const newCardName = formCardPopup.querySelector(".popup__input_type_card-name");
const newCardLink = formCardPopup.querySelector(".popup__input_type_url");

// Обработчики событий

buttonOpenEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
});

buttonClosePopupProfile.addEventListener("click", () => {
  closeModal(popupEditProfile);
});

buttonOpenAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
});

buttonCloseAddCard.addEventListener("click", () => {
  closeModal(popupAddCard);
});

buttonClosePopupImage.addEventListener("click", () => {
  closeModal(popupImage);
});

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});

function handleProfileSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;

  closeModal(popupEditProfile);
  profileForm.reset();
}

profileForm.addEventListener("submit", handleProfileSubmit);

function HandleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardNew = {
    name: newCardName.value,
    alt: newCardName.value,
    link: newCardLink.value,
  };

  placesList.prepend(createCard(cardNew, deleteCard));
  closeModal(popupAddCard);
  formCardPopup.reset();
}

formCardPopup.addEventListener("submit", HandleAddCardSubmit);
