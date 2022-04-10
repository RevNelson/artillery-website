import { FC, ReactNode } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { ThemeProvider } from "@emotion/react"

import GlobalStyles from "@styles/emotion-global"
import { emotionTheme } from "@styles/emotion-theme"
import Header from "./Header"

// import ScrollArrow from "@components/ui/ScrollArrow"
// import Alerts from "@components/ui/Alerts"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Alerts = dynamic(() => import("@components/ui/Alerts"), importOpts)
// const Header = dynamic(() => import("@components/ui/Layout/Header"), importOpts)
// const Footer = dynamic(() => import("@components/ui/Layout/Footer"), importOpts)
// const GlobalStyles = dynamic(() => import("styles/GlobalStyles"), importOpts)
const ScrollArrow = dynamic(
  () => import("@components/ui/ScrollArrow"),
  importOpts,
)

// ####
// #### Types
// ####

interface PropsType {
  children: ReactNode | ReactNode[]
}

// ####
// #### Component
// ####

const Layout: FC<PropsType> = ({ children }) => {
  return (
    <ThemeProvider theme={emotionTheme}>
      <GlobalStyles />
      <Header />
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
