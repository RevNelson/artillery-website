import { Tab } from "@headlessui/react"
import XIcon from "@heroicons/react/outline/XIcon"
import { Fragment } from "react"

import CurrencySelector from "../CurrencySelector"

const MobileMenu = ({ setMobileMenuOpen, navigation, classNames }: any) => {
  return (
    <>
      <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
        <div className="px-4 pt-5 pb-2 flex">
          <button
            type="button"
            className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <Tab.Group as="div" className="mt-2">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex px-4 space-x-8">
              {navigation.categories.map((category: any) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "text-indigo-600 border-indigo-600"
                        : "text-gray-900 border-transparent",
                      "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium",
                    )
                  }
                >
                  {category.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            {navigation.categories.map((category: any) => (
              <Tab.Panel key={category.name} className="px-4 py-6 space-y-12">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  {category.featured.map((item: any) => (
                    <div key={item.name} className="group relative">
                      <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          className="object-center object-cover"
                        />
                      </div>
                      <a
                        href={item.href}
                        className="mt-6 block text-sm font-medium text-gray-900"
                      >
                        <span
                          className="absolute z-10 inset-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-sm text-gray-500"
                      >
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
          {navigation.pages.map((page: any) => (
            <div key={page.name} className="flow-root">
              <a
                href={page.href}
                className="-m-2 p-2 block font-medium text-gray-900"
              >
                {"TEST"}
              </a>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
          <div className="flow-root">
            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
              Create an account
            </a>
          </div>
          <div className="flow-root">
            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
              Sign in
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
          <CurrencySelector />
        </div>
      </div>
    </>
  )
}

export default MobileMenu
