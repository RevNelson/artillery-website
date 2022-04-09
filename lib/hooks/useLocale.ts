import { useRouter } from "next/router";
import cookies from "js-cookie";

import { i18n as i18nConfig } from "@lib/i18n/config";
import { isServer } from "@lib/utils/isServer";

type LangsType = {
  [any: string]: { name: string; flag: string };
};

const useLocale = () => {
  const router = useRouter();

  const getLocale = (cookieKey: string = "NEXT_LOCALE"): string | void => {
    // Returns a string only if locale was previously set

    if (!isServer) {
      const userLocale = cookies.get(cookieKey);
      if (userLocale) return userLocale;
    }
  };

  const setLocale = (locale: string) => {
    if (!isServer && i18nConfig.locales.includes(locale)) {
      const currentLocale = getLocale();
      if (!currentLocale || currentLocale !== locale) {
        // Won't update if selected locale is same as saved

        // Set cookie so return visits will be in chosen locale
        cookies.set("NEXT_LOCALE", locale);
        // Replace current page request with request in new locale
        router.replace(router.pathname, router.pathname, { locale });
      }
    }
  };

  return {
    locale: router.locale || i18nConfig.defaultLocale,
    langs: i18nConfig.langs as LangsType,
    defaultLocale: i18nConfig.defaultLocale,
    locales: i18nConfig.locales,
    setLocale,
  };
};

export default useLocale;
