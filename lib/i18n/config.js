const langs = {
  en: { name: "English", flag: "us", nativeName: "English" },
  uk: { name: "Ukrainian", flag: "ua", nativeName: "Українська" },
  pl: { name: "Polish", flag: "pl", nativeName: "Polski" },
  es: { name: "Spanish", flag: "es", nativeName: "Español" },
}

const locales = Object.keys(langs)

const i18n = {
  locales,
  defaultLocale: "en",
  langs,
}

module.exports = { i18n }
