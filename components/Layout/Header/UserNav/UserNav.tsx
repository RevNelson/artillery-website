import QuestionMarkCircleIcon from "@heroicons/react/outline/QuestionMarkCircleIcon"
import ShoppingBagIcon from "@heroicons/react/outline/ShoppingBagIcon"

const UserNav = () => {
  return (
    <>
      <div className="flex-1 flex items-center justify-end">
        <a href="#" className="hidden text-sm font-medium text-white lg:block">
          Search
        </a>

        <div className="flex items-center lg:ml-8">
          {/* Help */}
          <a href="#" className="p-2 text-white lg:hidden">
            <span className="sr-only">Help</span>
            <QuestionMarkCircleIcon className="w-6 h-6" aria-hidden="true" />
          </a>
          <a
            href="#"
            className="hidden text-sm font-medium text-white lg:block"
          >
            Help
          </a>

          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-8">
            <a href="#" className="group -m-2 p-2 flex items-center">
              <ShoppingBagIcon
                className="flex-shrink-0 h-6 w-6 text-white"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-white">0</span>
              <span className="sr-only">items in cart, view bag</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
