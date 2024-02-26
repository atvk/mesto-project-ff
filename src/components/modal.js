export function openModal(event) {
  event.classList.add("popup_is-opened");
  event.classList.add("popup_is-animated");

  document.addEventListener("click", (e) => {
    if (e.target === event) {
      closeModal(event);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(event);
    }
  });
}

export function closeModal(event) {
  event.classList.remove("popup_is-opened");

  document.removeEventListener("click", (e) => {
    if (e.target === event) {
      closeModal(event);
    }
  });

  document.removeEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(event);
    }
  });
}
