import { gql } from "urql"

const getUIStrings = gql`
  query GetUIStrings($id: ID!) {
    artilleryPage(id: $id, idType: URI) {
      id
      ACFui {
        profileMenu {
          orders
          register
          signIn
          signOut
        }
        cart {
          title
          emptyCart
          emptyActionLabel
          clearCart
          closeCart
          checkout
          removeItem
        }
      }
    }
  }
`
