import { useState } from "react"
import Headroom from "react-headroom"
import { MenuIcon, SearchIcon } from "@heroicons/react/outline"

import MobileMenu from "./MobileMenu"
import TopNav from "./TopNav"
import MainMenu from "./MainMenu"
import UserNav from "./UserNav"
import { ArtilleryPage_Acfhome_Hero, Maybe } from "@api/gql/types"

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type PropsType = {
  hero?: Maybe<ArtilleryPage_Acfhome_Hero> | undefined
}

export const Header = ({ hero }: PropsType) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [signInOpen, setSignInOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <>
      <MobileMenu
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        navigation={navigation}
        classNames={classNames}
      />

      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        {hero && (
          <>
            {hero.image?.sourceUrl && (
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
              >
                <img
                  src={hero.image.sourceUrl}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
            )}
            {hero.overlay && (
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundColor: hero.overlay.color || "#111827",
                  opacity: hero.overlay.opacity || 0.5,
                }}
              />
            )}
          </>
        )}

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

                      <MainMenu
                        navigation={navigation}
                        classNames={classNames}
                      />

                      {/* Mobile menu and search (lg-) */}
                      <div className="flex-1 flex items-center lg:hidden">
                        <button
                          type="button"
                          className="-ml-2 p-2 text-white"
                          onClick={() => setMobileMenuOpen(true)}
                        >
                          <span className="sr-only">Open menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Search */}
                        <a href="#" className="ml-2 p-2 text-white">
                          <span className="sr-only">Search</span>
                          <SearchIcon className="w-6 h-6" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Logo (lg-) */}
                      <a href="#" className="lg:hidden">
                        <span className="sr-only">Workflow</span>
                        <img
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                          alt=""
                          className="h-8 w-auto"
                        />
                      </a>

                      <UserNav
                        iconSize="h-6 w-6"
                        setSignInOpen={setSignInOpen}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </Headroom>
        </header>

        {hero && (
          <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
            {hero.title && (
              <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
                {hero.title}
              </h1>
            )}
            {hero.text && (
              <p className="mt-4 text-xl text-white">{hero.text}</p>
            )}
            {hero.link && (
              <a
                href={hero.link.url || "#"}
                className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                {hero.link.label}
              </a>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Header
