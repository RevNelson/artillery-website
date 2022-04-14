import { useMemo } from "react"
import { AppProps } from "next/dist/pages/_app"
import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import merge from "deepmerge"
import isEqual from "lodash.isequal"
import fetch from "isomorphic-unfetch"

import { cache as defaultCache } from "./cache"
import { isServer } from "@lib/utils/isServer"
import { authConstants } from "@lib/constants"
import { InMemoryAuthTokenType } from "@lib/types/auth"

export const PERSISTOR_CACHE_KEY =
  process.env.NEXT_PUBLIC_PERSISTOR_CACHE_KEY || "missing-cache-key"

export const APOLLO_STATE_PROP_NAME =
  process.env.NEXT_PUBLIC_APOLLO_STATE_PROP_NAME || "__APOLLO_STATE__"

let apolloClient: ApolloClient<NormalizedCacheObject>

const isTokenValid = (authToken: InMemoryAuthTokenType): boolean => {
  if (!isServer && authToken.authExpiration) {
    const now = Date.now()
    const expiration = authToken.authExpiration
      ? authToken.authExpiration * 1000
      : now

    if (expiration - now > 1000) {
      return true
    } else {
      localStorage.removeItem(authConstants.AUTH_TOKEN_KEY)
    }
  }
  return false
}

const createApolloClient = () => {
  // isomorphic fetch for passing the cookies along with each GraphQL request

  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
    }).then(response => response)
  }

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_BASE_URL,
    // Make sure that CORS and cookies work
    fetchOptions: {
      mode: "cors",
    },
    credentials: "include",
    fetch: enhancedFetch,
  })

  /**
   * Middleware operation
   * Check for expired tokens, set headers.
   */
  const middleware = new ApolloLink((operation, forward) => {
    if (!isServer) {
      const wooSession = localStorage.getItem(authConstants.WOO_SESSION_KEY)
      const rawAuthToken = localStorage.getItem(authConstants.AUTH_TOKEN_KEY)

      if (rawAuthToken || wooSession) {
        const authToken: InMemoryAuthTokenType =
          rawAuthToken && JSON.parse(rawAuthToken || "")

        let headers: {
          authorization?: string
          "woocommerce-session"?: string
        } = {}

        if (authToken) {
          const valid = isTokenValid(authToken)

          valid &&
            authToken.authExpiration &&
            (headers.authorization = `Bearer ${authToken.authToken}`)
        }

        wooSession && (headers["woocommerce-session"] = `Session ${wooSession}`)

        // If session data exist in local storage, set value as session header.
        operation.setContext(({}) => ({
          headers,
        }))
      }

      // console.log("AUTH TOKEN", jwtDecode(authToken))
      // console.log("WOO SESSION", jwtDecode(wooSession))
    }

    return forward(operation)
  })

  /**
   * Afterware operation
   * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
   */
  const afterware = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      /**
       * Check for session header and update session in local storage accordingly.
       */
      if (!isServer) {
        const context = operation.getContext()

        const {
          response: { headers },
        } = context

        const session = headers.get("woocommerce-session")
        const localSession = localStorage.getItem(authConstants.WOO_SESSION_KEY)

        if (session) {
          if (localSession !== session) {
            localStorage.setItem(authConstants.WOO_SESSION_KEY, session)
          }
        }
      }

      return response
    })
  })

  const apolloLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          locations &&
            locations.map(location => {
              console.log("LOCATION: ", location)
            })
        })
      if (networkError)
        console.log(
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
        )
    }),
    // this uses apollo-link-http under the hood, so all the options here come from that package
    middleware,
    afterware,
    httpLink,
  ])

  let defaultOptions: DefaultOptions
  if (typeof window === "undefined") {
    //We don't want any cache to be stored server side
    defaultOptions = {
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    }
  } else {
    //We immediately show results, but check in the background if any changes occured, and eventually update the view
    defaultOptions = {
      query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
    }
  }

  return new ApolloClient({
    ssrMode: isServer,
    link: apolloLink,
    cache: defaultCache,
    defaultOptions,
  })
}

export const useApollo = (
  pageProps: Record<string, unknown>,
): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as
    | NormalizedCacheObject
    | undefined
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}

export const initializeApollo = (
  initialState: NormalizedCacheObject | undefined = undefined,
) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}
