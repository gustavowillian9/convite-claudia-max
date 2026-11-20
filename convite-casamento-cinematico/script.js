const envelopeScreen = document.getElementById("envelopeScreen");
const revealScreen = document.getElementById("revealScreen");
const invitationScreen = document.getElementById("invitationScreen");

const openEnvelopeButton = document.getElementById("openEnvelope");
const showInvitationButton = document.getElementById("showInvitation");
const replayButton = document.getElementById("replayInvitation");

let isOpening = false;

function changeScreen(currentScreen, nextScreen) {
  currentScreen.classList.add("is-leaving");

  window.setTimeout(() => {
    currentScreen.classList.remove("is-active", "is-leaving");
    nextScreen.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 780);
}

openEnvelopeButton.addEventListener("click", () => {
  if (isOpening) return;

  isOpening = true;
  envelopeScreen.classList.add("opening");
  openEnvelopeButton.setAttribute("aria-disabled", "true");

  // A cena fechada ganha um movimento de aproximação e desaparece.
  // Em seguida, entra a fotografia real do envelope aberto enviada pela cliente.
  window.setTimeout(() => {
    changeScreen(envelopeScreen, revealScreen);
    isOpening = false;
  }, 1900);
});

showInvitationButton.addEventListener("click", () => {
  changeScreen(revealScreen, invitationScreen);
});

replayButton.addEventListener("click", () => {
  envelopeScreen.classList.remove("opening");
  openEnvelopeButton.removeAttribute("aria-disabled");
  changeScreen(invitationScreen, envelopeScreen);
});

// Evita que o navegador tente arrastar as fotografias durante a interação.
document.querySelectorAll(".reference-image").forEach((image) => {
  image.addEventListener("dragstart", (event) => event.preventDefault());
});
