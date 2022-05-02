import { gql } from "urql"

export const getLocales = gql`
  query GetLocales {
    locales
  }
`
