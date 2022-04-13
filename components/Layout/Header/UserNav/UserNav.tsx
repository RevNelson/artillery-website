import ProfileMenu from "./ProfileMenu"
import LanguageMenu from "./LanguageMenu"
import ShoppingCart from "./ShoppingCart"

// ####
// #### Component
// ####

const UserNav = () => {
  return (
    <>
      <div className="flex-1 flex items-center justify-end">
        <a href="#" className="hidden text-sm font-medium text-white lg:block">
          Search
        </a>

        <div className="flex items-center lg:ml-8">
          <LanguageMenu />
          <ProfileMenu />

          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-8">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
