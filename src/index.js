import "../src/style/index.css";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { setCloseByClickListeners } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";
import { likeCard } from "./components/card.js";
import { clearValidation } from "./components/validation.js";
import { enableValidation } from "./components/validation.js";
import { validationConfig } from "./components/validation.js";
import { getProfileInfo } from "./components/api.js";
import { updateProfileInfo } from "./components/api.js";
import { updateProfileAvatar } from "./components/api.js";
import { getCardList } from "./components/api.js";
import { postCard } from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.name;
const descriptionInput = profileForm.description;
const profileSubmitButton = profileForm.button;

const avatarImage = document.querySelector(".profile__image");
const popupAvatarProfile = document.querySelector(".popup_type_update-avatar");
const avatarForm = document.forms["avatar"];
const urlInput = avatarForm.link;
const avatarSubmitButton = avatarForm.button;

const popupAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const formCard = document.forms["new-place"];
const newNameCard = formCard.elements["place-name"];
const newUrlCard = formCard.elements["link"];
const cardSubmitButton = formCard.button;

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");

Promise.all([getProfileInfo(), getCardList()])
  .then(([inishialProfile, cardList]) => {
    profileAvatar.style.backgroundImage = `url('${inishialProfile.avatar}')`;
    profileTitle.textContent = inishialProfile.name;
    profileDescription.textContent = inishialProfile.about;

    const userId = inishialProfile._id;

    cardList.forEach((card) => {
      const cardData = {
        link: card.link,
        name: card.name,
        _id: card._id,
        ownerId: card.owner._id,
        likes: card.likes,
      };

      cardsContainer.append(
        createCard(cardData, userId, { deleteCard, likeCard, openImagePopup })
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

function handleAvatarSubmit(e) {
  e.preventDefault();
  avatarSubmitButton.textContent = "Сохранить...";
  const newAvatar = { avatar: urlInput.value };
  updateProfileAvatar(newAvatar)
    .then((newAvatar) => {
      profileAvatar.style.backgroundImage = `url('${newAvatar.avatar}')`;
      closePopup(popupAvatarProfile);
      avatarForm.reset();
      clearValidation(validationConfig, avatarForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileSubmitButton.textContent = "Сохранить...";
  const newProfileInfo = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  updateProfileInfo(newProfileInfo)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  cardSubmitButton.textContent = "Сохранить...";
  const cardNew = {
    link: newUrlCard.value,
    name: newNameCard.value,
  };
  postCard(cardNew)
    .then((cardNew, userId) => {
      cardsContainer.prepend(
        createCard(cardNew, userId, { deleteCard, likeCard, openImagePopup })
      );
      closePopup(popupAddCard);
      formCard.reset();
      clearValidation(validationConfig, formCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = "Сохранить";
    });

}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupTypeImage);
}

setCloseByClickListeners(popups);

enableValidation(validationConfig);

avatarImage.addEventListener("click", () => {
  openPopup(popupAvatarProfile);
  avatarForm.reset();
  clearValidation(validationConfig, avatarForm);
});

buttonOpenEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(validationConfig, profileForm);
});

buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

profileForm.addEventListener("submit", handleProfileSubmit);

formCard.addEventListener("submit", handleAddCardSubmit);
