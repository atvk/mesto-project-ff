const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(item, deleteCallBack) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = `на фотографии ${item.link}`;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallBack(cardElement);
    });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});
