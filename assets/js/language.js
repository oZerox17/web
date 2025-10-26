
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || (navigator.language.startsWith("de") ? "de":"en");
  setLanguage(saved);
});
