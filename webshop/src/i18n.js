import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ee: {
    translation: {
      "Welcome to React": "Tere tulemast Reacti",
      "navbar.admin-button": "Administraatori vaatesse",
      "navbar.cart-button": "Ostukorvi",
      "home.sortAZ": "Sorteeri A-Z",
      "home.add-to-cart-button": "Lisa ostukorvi",
      "home.cart-successfully": "Edukalt ostukorvi lisatud!",
      'filterbar.all-categories': "Kõik kategooriad"
    }
  },
  ru: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "navbar.admin-button": "Administraator RU",
      "navbar.cart-button": "Ostukorv RU",
      "home.sortAZ": "Sorteeri A-Z RU",
      "home.add-to-cart-button": "Lisa ostukorvi RU",
      "home.cart-successfully": "Edukalt ostukorvi lisatud! RU",
      'filterbar.all-categories': "Kõik kategooriad RU"
    }
  },
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "navbar.admin-button": "To admin view",
      "navbar.cart-button": "To cart",
      "home.sortAZ": "Sort A-Z",
      "home.add-to-cart-button": "Add to cart",
      "home.cart-successfully": "Successfully added to cart!",
      'filterbar.all-categories': "All categories"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ee", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;