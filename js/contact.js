const contactForm = document.querySelector(".contact-form");
const phoneInput = document.querySelector("#contact-phone");
const phoneError = document.querySelector("#contact-phone-error");
const fields = contactForm.querySelectorAll("input:not([type='hidden']), textarea");

function validateField(field) {
  const value = field.value.trim();
  let message = value ? "" : "Please fill out this field.";

  if (field === phoneInput && value) {
    const digits = value.replace(/\D/g, "");
    const valid =
      /^\+?[0-9\s().-]+$/.test(value) &&
      digits.length >= 7 &&
      digits.length <= 15;

    if (!valid) {
      message = "Enter a valid phone number (7–15 digits).";
    }
  }

  field.setCustomValidity(message);

  if (field === phoneInput) {
    phoneError.textContent = message;
    phoneInput.setAttribute("aria-invalid", String(Boolean(message)));
  }

  return !message;
}

fields.forEach((field) => {
  field.addEventListener("input", () => validateField(field));
});

contactForm.addEventListener("submit", (event) => {
  const firstInvalidField = Array.from(fields).find(
    (field) => !validateField(field)
  );

  if (firstInvalidField) {
    event.preventDefault();
    firstInvalidField.reportValidity();
    firstInvalidField.focus();
  }
});