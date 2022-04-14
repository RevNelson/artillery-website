import { Menu, Transition } from "@headlessui/react"

import useLocale from "@lib/hooks/useLocale"

import FlagIcon from "@components/FlagIcon"

// ####
// #### Component
// ####

const LanguageMenu = () => {
  const { locale: currentLocale, locales, langs, setLocale } = useLocale()

  return (
    <>
      <Menu
        as="div"
        className="block relative lg:flex-shrink-0 h-full mr-4 lg:mr-8"
      >
        {({ open }) => (
          <div>
            <div className="h-full">
              <Menu.Button
                className={`font-bold text-sm rounded-md py-2 outline-none`}
              >
                <span className="sr-only">Open user menu</span>
                <FlagIcon
                  locale={currentLocale}
                  square={false}
                  size={8}
                  rounded
                />
              </Menu.Button>
            </div>

            <Transition
              as="div"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="origin-top-right z-20 absolute -right-2 pt-2 w-48"
            >
              <Menu.Items className="rounded-md bg-gray-100 outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                <>
                  {locales &&
                    locales.map(locale => (
                      <Menu.Item key={"locale" + locale}>
                        <div
                          onClick={() => setLocale(locale)}
                          title={langs[locale].name}
                          className="transition flex items-center hover:bg-blue-light outline-none ring-transparent hover:text-yellow text-blue-dark px-4 py-2 text-sm cursor-pointer"
                        >
                          <div className="mr-2">
                            <FlagIcon
                              size={4}
                              square
                              rounded="rounded-full"
                              locale={locale}
                            />
                          </div>
                          <span
                            className={
                              locale === currentLocale
                                ? "font-bold underline"
                                : ""
                            }
                          >
                            {langs[locale].nativeName}
                          </span>
                        </div>
                      </Menu.Item>
                    ))}
                </>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </>
  )
}

export default LanguageMenu
