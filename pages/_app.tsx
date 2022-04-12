import "../styles/tailwind.css"

import { ReactElement, ReactNode } from "react"
import { Router } from "next/router"
import type { AppProps } from "next/app"
import { NextPage } from "next/types"
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider"

import { useApollo } from "@lib/apollo/client"
import ProgressBar from "@lib/progressBar"

// ####
// #### Dynamic Imports
// ####

// const importOpts = {};

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

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps)
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}

export default App
