import dynamic from "next/dynamic"
import UserIcon from "@heroicons/react/outline/UserIcon"
import TranslateIcon from "@heroicons/react/outline/TranslateIcon"

import CartButton from "./CartButton"

// ####
// #### Dynamic Imports
// ####

const MenuLoaderButton = () => (
  <div className="hidden lg:block relative lg:flex-shrink-0 h-full">
    <div className="h-full">
      <button className="font-bold text-sm rounded-md py-2 outline-none text-white hover:text-gray-200">
        <span className="sr-only">Open user menu</span>
        <UserIcon className="h-6 w-6" />
      </button>
    </div>
  </div>
)

const LanguageLoaderButton = () => (
  <div className="block relative lg:flex-shrink-0 h-full mr-4 lg:mr-8">
    <div className="h-full">
      <button className="font-bold text-sm rounded-md py-2 outline-none text-white">
        <span className="sr-only">Open user menu</span>
        <TranslateIcon className="h-6 w-6" />
      </button>
    </div>
  </div>
)

const LanguageMenu = dynamic(() => import("./LanguageMenu"), {
  loading: () => <LanguageLoaderButton />,
})
const ProfileMenu = dynamic(() => import("./ProfileMenu"), {
  loading: () => <MenuLoaderButton />,
})

// ####
// #### Component
// ####

const UserNav = () => {
  return (
    <>
      <div className="flex-1 flex items-center justify-end">
        {/* <a href="#" className="hidden text-sm font-medium text-white lg:block">
          Search
        </a> */}

        <div className="flex items-center lg:ml-8">
          <LanguageMenu />
          <ProfileMenu />
          {/* <LoaderButton /> */}

          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-8">
            <CartButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
