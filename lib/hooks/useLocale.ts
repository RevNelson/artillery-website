import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "js-cookie";

import { i18n as i18nConfig } from "@lib/i18n/config";
import { isServer } from "@lib/utils/isServer";

const useLocale = () => {
  const router = useRouter();

  const getLocale = useCallback((): string | void => {
    if (!isServer) {
      const userLocale = cookies.get("NEXT_LOCALE");
      if (userLocale) return userLocale;
    }
  }, []);

  const setLocale = useCallback((locale: string) => {
    if (!isServer && i18nConfig.locales.includes(locale)) {
      cookies.set("NEXT_LOCALE", locale);
    }
  }, []);

  useEffect(() => {
    const getLocale = (): string | void => {
      if (!isServer) {
        const userLocale = cookies.get("NEXT_LOCALE");
        if (userLocale) return userLocale;
      }
    };

    if (!getLocale()) {
      setLocale(router.locale || i18nConfig.defaultLocale);
    }
  }, [router, getLocale, setLocale]);

  return {
    locale: router.locale,
    defaultLocale: i18nConfig.defaultLocale,
    locales: i18nConfig.locales,
    setLocale,
  };
};

export default useLocale;
