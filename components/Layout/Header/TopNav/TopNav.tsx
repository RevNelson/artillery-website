import CurrencySelector from "../CurrencySelector"

const TopNav = () => {
  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
          <CurrencySelector />

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm font-medium text-white hover:text-gray-100"
            >
              Sign in
            </a>
            <a
              href="#"
              className="text-sm font-medium text-white hover:text-gray-100"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopNav
