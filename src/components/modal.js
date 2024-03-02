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