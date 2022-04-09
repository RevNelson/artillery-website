const langs = {
  en: { name: "English", flag: "us" },
  uk: { name: "Ukrainian", flag: "ua" },
  pl: { name: "Polish", flag: "pl" },
  es: { name: "Spanish", flag: "es" },
};

const locales = Object.keys(langs);

const i18n = {
  locales,
  defaultLocale: "en",
  langs,
};

module.exports = { i18n };
