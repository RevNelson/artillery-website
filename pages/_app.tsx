import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";

import initializeApollo from "@lib/apollo/client";
import useApollo from "@lib/apollo/useApollo";

// ####
// #### Dynamic Imports
// ####

// const importOpts = {};

// ####
// #### Variables
// ####

function ARTilleryWebsite({ Component, pageProps }: AppProps) {
  const { client: apolloClient } = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient || initializeApollo({})}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default ARTilleryWebsite;
