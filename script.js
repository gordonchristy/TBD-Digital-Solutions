const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  formNote.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formNote.textContent =
        "Thank you for contacting TBD Digital Solutions. We will get back to you within three business days.";
      form.reset();
    } else {
      formNote.textContent =
        "Something went wrong. Please try again or email us directly.";
    }
  } catch (error) {
    formNote.textContent =
      "Network error. Please check your connection and try again.";
  } finally {
    button.disabled = false;
  }
});
