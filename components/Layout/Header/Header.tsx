import dynamic from "next/dynamic"
import Headroom from "react-headroom"

import { ArtilleryPage_Acfhome_Hero, Maybe } from "@api/gql/types"

// import TopNav from "./TopNav"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Hero = dynamic(() => import("./Hero"), {})
const MainMenu = dynamic(() => import("./MainMenu"), {})
const MobileMenu = dynamic(() => import("./MobileMenu"), {})
const UserNav = dynamic(() => import("./UserNav"), {
  ssr: false,
})

// ####
// #### Types
// ####

type PropsType = {
  hero?: Maybe<ArtilleryPage_Acfhome_Hero> | undefined
}

// ####
// #### Component
// ####

export const Header = ({ hero }: PropsType) => {
  // const [searchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <>
      <div className="relative bg-gray-900">
        {/* Navigation */}
        <header className="relative z-10">
          <Headroom
            style={{ zIndex: 11 }}
            upTolerance={2}
            className={`font-family h-26 bg-opacity-100`}
          >
            <nav aria-label="Top">
              {/* <TopNav /> */}

              {/* Secondary navigation */}
              <div className="backdrop-blur-md backdrop-filter bg-opacity-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div>
                    <div className="h-16 flex items-center justify-between">
                      {/* Logo (lg+) */}
                      <div className="hidden lg:flex-1 lg:flex lg:items-center">
                        <a href="#">
                          <span className="sr-only">Workflow</span>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                            alt=""
                          />
                        </a>
                      </div>

                      <MainMenu />

                      {/* Mobile menu and search (lg-) */}
                      <MobileMenu />

                      {/* Logo (lg-) */}
                      <a href="#" className="lg:hidden">
                        <span className="sr-only">Workflow</span>
                        <img
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                          alt=""
                          className="h-8 w-auto"
                        />
                      </a>

                      <UserNav />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </Headroom>
        </header>

        {/* Decorative image and overlay */}

        {hero && <Hero hero={hero} />}
      </div>
    </>
  )
}

export default Header
