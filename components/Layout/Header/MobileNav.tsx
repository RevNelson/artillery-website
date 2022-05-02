import MenuIcon from "@heroicons/react/outline/MenuIcon"
// import SearchIcon from "@heroicons/react/outline/SearchIcon"

import useStore from "@lib/hooks/useStore"

// ####
// #### Component
// ####

const MobileNav = () => {
  const setOpen = useStore(state => state.ui.setMobileMenuOpen)

  return (
    <>
      {/* Header Buttons */}
      <div className="flex-1 flex items-center lg:hidden">
        <button
          type="button"
          className="-ml-2 p-2 text-white"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Search */}
        {/* <a href="#" className="ml-2 p-2 text-white">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-6 h-6" aria-hidden="true" />
        </a> */}
      </div>
    </>
  )
}

export default MobileNav
