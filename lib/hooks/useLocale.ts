import { useRouter } from "next/router"
import cookies from "js-cookie"

import { i18n as i18nConfig } from "@lib/i18n/config"
import { isServer } from "@lib/utils/isServer"

type LangsType = {
  [any: string]: { name: string; flag: string; nativeName: string }
}

const useLocale = () => {
  const router = useRouter()

  const getLocale = (cookieKey: string = "NEXT_LOCALE"): string | void => {
    // Returns a string only if locale was previously set

    if (!isServer) {
      const userLocale = cookies.get(cookieKey)
      if (userLocale) return userLocale
    }
  }

  const setLocale = (newLocale: string) => {
    if (!isServer && router.locales && router.locales.includes(newLocale)) {
      const { pathname, asPath, query, locale: routerLocale } = router
      const savedLocale = getLocale()

      if (!savedLocale || savedLocale !== newLocale) {
        // Won't update if selected locale is same as saved

        // Set cookie so return visits will be in chosen locale
        cookies.set("NEXT_LOCALE", newLocale)
      }

      if (routerLocale !== newLocale) {
        // Replace current page with page in new locale
        router.replace({ pathname, query }, asPath, { locale: newLocale })
      }
    }
  }

  return {
    locale: router.locale || i18nConfig.defaultLocale,
    langs: i18nConfig.langs as LangsType,
    defaultLocale: i18nConfig.defaultLocale,
    locales: router.locales || i18nConfig.locales,
    setLocale,
  }
}

export default useLocale
