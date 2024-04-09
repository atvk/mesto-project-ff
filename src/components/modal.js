function handleEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export function setCloseByClickListeners(popups) {
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
}
