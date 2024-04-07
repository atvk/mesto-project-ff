import "../src/style/index.css";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";
import { likeCard } from "./components/card.js";
import { clearValidation } from "./components/validation.js";
import { enableValidation } from "./components/validation.js";
import { getProfileInfo } from "./components/api.js";
import { updateProfileInfo } from "./components/api.js";
import { updateProfileAvatar } from "./components/api.js";
import { getCardList } from "./components/api.js";
import { postCard } from "./components/api.js";

const placesList = document.querySelector(".places__list");
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

avatarImage.addEventListener("click", () => {
  openPopup(popupAvatarProfile);
  clearValidation(avatarForm);
});

buttonOpenEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm);
});

buttonOpenAddCard.addEventListener("click", () => {
  clearValidation(formCard);
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

function handleAvatarSubmit(e) {
  e.preventDefault();
  avatarSubmitButton.textContent = "Сохранить...";
  const newAvatar = { avatar: urlInput.value };
  updateProfileAvatar(newAvatar)
    .then((newAvatar) => {
      profileAvatar.style.backgroundImage = `url('${newAvatar.avatar}')`;
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    });

  closePopup(popupAvatarProfile);
  avatarForm.reset();
}
avatarForm.addEventListener("submit", handleAvatarSubmit);

function handleProfileSubmit(e) {
  e.preventDefault();
  profileSubmitButton.textContent = "Сохранить...";
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  const newProfileInfo = {
    name: nameInput.value,
    about: descriptionInput.value,
  };
  updateProfileInfo(newProfileInfo).finally(() => {
    profileSubmitButton.textContent = "Сохранить";
  });
  closePopup(popupEditProfile);
  profileForm.reset();
}
profileForm.addEventListener("submit", handleProfileSubmit);

function handleAddCardSubmit(e) {
  e.preventDefault();
  cardSubmitButton.textContent = "Сохранить...";
  const cardNew = {
    link: newUrlCard.value,
    name: newNameCard.value,
  };

  postCard(cardNew)
    .then((cardNew) => {
      placesList.prepend(
        createCard(cardNew, { deleteCard, likeCard, handleImageClick })
      );
    })
    .finally(() => {
      cardSubmitButton.textContent = "Сохранить";
    });

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

enableValidation();

Promise.all([getProfileInfo(), getCardList()]).then(
  ([inishialProfile, cardList]) => {
    profileAvatar.style.backgroundImage = `url('${inishialProfile.avatar}')`;
    profileTitle.textContent = inishialProfile.name;
    profileDescription.textContent = inishialProfile.about;

    cardList.forEach((card) => {
      
      const cardData = {
        link: card.link,
        name: card.name,

        _id: card._id,

        userData: inishialProfile,
        usersData: card.owner,

        myId: inishialProfile._id,
        usersId: card.owner._id,

        likes: card.likes,
        length: card.likes.length,
      };

      

      placesList.append(
        createCard(cardData, { deleteCard, likeCard, handleImageClick })
      );
    });
  }
);
