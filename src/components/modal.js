export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  function handleEscape(e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  }
  document.addEventListener("keydown", handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  function handleEscape(e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  }
  document.removeEventListener("keydown", handleEscape);
}
