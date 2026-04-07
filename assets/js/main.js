import { initAnimations } from "./animations.js";
import { initForm } from "./form.js";
import { initLanguageSwitcher } from "./language-switcher.js";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initForm();
  initLanguageSwitcher();
});
