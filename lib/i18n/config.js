const langs = [
  { name: "English", code: "en", flag: "us" },
  { name: "Ukrainian", code: "uk", flag: "ua" },
  { name: "Polish", code: "pl", flag: "pl" },
  { name: "Spanish", code: "es", flag: "es" },
];

const locales = langs.map((lang) => lang.code);

const i18n = {
  locales,
  defaultLocale: "en",
  langs,
};

module.exports = { i18n };
