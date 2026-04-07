import { translations } from "./translations.js";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : null;
  }, obj);
}

function setActiveButton(language) {
  document.querySelectorAll(".lang-flag").forEach((button) => {
    button.classList.remove("is-active");
  });

  const activeButton = document.querySelector(`.lang-${language}`);
  if (activeButton) {
    activeButton.classList.add("is-active");
  }
}

function applyTranslations(language) {
  const currentTranslations = translations[language];
  if (!currentTranslations) return;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getNestedValue(currentTranslations, key);

    if (value === null) return;

    if (element.dataset.i18nHtml === "true") {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = getNestedValue(currentTranslations, key);

    if (value !== null) {
      element.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    const value = getNestedValue(currentTranslations, key);

    if (value !== null) {
      element.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    const value = getNestedValue(currentTranslations, key);

    if (value !== null) {
      element.setAttribute("title", value);
    }
  });

  setActiveButton(language);
  localStorage.setItem("siteLanguage", language);
}

export function initLanguageSwitcher() {
  const ptButton = document.querySelector(".lang-pt");
  const esButton = document.querySelector(".lang-es");
  const enButton = document.querySelector(".lang-en");

  if (!ptButton || !esButton || !enButton) return;

  const defaultLanguage = "en";
  const savedLanguage = localStorage.getItem("siteLanguage") || defaultLanguage;

  applyTranslations(savedLanguage);

  ptButton.addEventListener("click", (event) => {
    event.preventDefault();
    applyTranslations("pt");
  });

  esButton.addEventListener("click", (event) => {
    event.preventDefault();
    applyTranslations("es");
  });

  enButton.addEventListener("click", (event) => {
    event.preventDefault();
    applyTranslations("en");
  });
}
