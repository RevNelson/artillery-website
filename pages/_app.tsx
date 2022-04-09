import "../styles/fonts.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";

import { useApollo } from "@lib/apollo/client";

// ####
// #### Dynamic Imports
// ####

// const importOpts = {};

// ####
// #### Variables
// ####

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
