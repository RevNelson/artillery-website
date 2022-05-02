import "../styles/tailwind.css"

import { ReactElement, ReactNode } from "react"
import { Router } from "next/router"
import type { AppProps } from "next/app"
import { NextPage } from "next/types"

import ProgressBar from "@lib/progressBar"
import { useCreateStore, Provider } from "@api/store"

// ####
// #### Variables
// ####

const progress = new ProgressBar({
  size: 2,
  color: "#FFD700",
  className: "progress-bar",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

// ####
// #### Types
// ####

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// ####
// #### Component
// ####
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const createStore = useCreateStore(pageProps.initStore)

  const getLayout = Component.getLayout ?? ((Component: any) => Component)
  return (
    <>
      <Provider createStore={createStore}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  )
}

export default App
