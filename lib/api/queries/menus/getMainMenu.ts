import { gql } from "urql"

const getMainMenuData = gql`
  query GetMainMenuData($locale: String) {
    menus(where: { location: PRIMARY, language: $locale }) {
      nodes {
        name
        id
        menuItems {
          nodes {
            id
            label
            path
            childItems {
              nodes {
                id
                label
                path
                childItems {
                  nodes {
                    id
                    label
                    path
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
