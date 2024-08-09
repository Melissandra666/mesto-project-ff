function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  };
};

function openModal(modal) {
  if (modal && modal.classList.contains("popup")) {
    modal.classList.add("popup_is-animated");
    setTimeout(() => {
      modal.classList.add("popup_is-opened");
    }, 10);
    document.addEventListener("keydown", closeModalOnEsc);
    modal.addEventListener("click", handleOverlayClick);
  };
};

function closeModal(modal) {
  if (modal && modal.classList.contains("popup_is-opened")) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalOnEsc);
    modal.removeEventListener("click", handleOverlayClick);
    modal.addEventListener("transitionend", () => {
      if (!modal.classList.contains("popup_is-opened")) {
        modal.classList.remove("popup_is-animated");
      }
      },
      { once: true }
    );
  };
};

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    };
  };
};

export { openModal, closeModal };
