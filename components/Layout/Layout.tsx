import { FC, ReactNode } from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@emotion/react"

import { ArtilleryPage_Acfhome_Hero, Maybe } from "@api/gql/types"
import { emotionTheme } from "@styles/emotion-theme"

import Header from "./Header"

// ####
// #### Dynamic Imports
// ####

const importOpts = { ssr: false }

const Alerts = dynamic(() => import("@components/ui/Alerts"), importOpts)
// const Footer = dynamic(() => import("@components/ui/Layout/Footer"), {})
const GlobalStyles = dynamic(() => import("@styles/emotion-global"), {})
const ScrollArrow = dynamic(
  () => import("@components/ui/ScrollArrow"),
  importOpts,
)

// ####
// #### Types
// ####

interface PropsType {
  children: ReactNode | ReactNode[]
  hero?: Maybe<ArtilleryPage_Acfhome_Hero> | undefined
}

// ####
// #### Component
// ####

const Layout: FC<PropsType> = ({ children, hero }) => {
  return (
    <ThemeProvider theme={emotionTheme}>
      <GlobalStyles />
      <Header hero={hero} />
      <main className="overflow-y-auto bg-white max-w-full relative overflow-x-hidden font-family min-h-screen">
        {children}
      </main>
      {/* <Footer />*/}

      <ScrollArrow />
      <Alerts />
    </ThemeProvider>
  )
}

export default Layout
