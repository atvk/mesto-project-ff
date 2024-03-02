import "../src/style/index.css";
import { initialCards } from "./components/cards.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";
import { likeCard } from "./components/card.js";

// Контейнер с картинками
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
// Шапка сайта
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Профайл
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.name;
const descriptionInput = profileForm.description;
// Карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const formCard = document.forms["new-place"];
const newNameCard = formCard.elements["place-name"];
const newUrlCard = formCard.elements["link"];
// Картинка
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
// Обработчики событий
buttonOpenEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});
buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  });
});
//Вывод
initialCards.forEach((card) => {
  placesList.append(
    createCard(card, { deleteCard, likeCard, handleImageClick })
  );
});
// Функции
function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
  profileForm.reset();
}
profileForm.addEventListener("submit", handleProfileSubmit);

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardNew = {
    name: newNameCard.value,
    alt: newNameCard.value,
    link: newUrlCard.value,
  };
  placesList.prepend(
    createCard(cardNew, { deleteCard, likeCard, handleImageClick })
  );
  closePopup(popupAddCard);
  formCard.reset();
}
formCard.addEventListener("submit", handleAddCardSubmit);

function handleImageClick(e) {
  popupImage.setAttribute("src", e.link);
  popupImage.setAttribute("alt", e.name);
  popupCaption.textContent = e.name;
  openPopup(popupTypeImage);
}
