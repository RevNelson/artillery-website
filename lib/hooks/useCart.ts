import {
  RemoveItemsFromCartInput,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
} from "@api/gql/types"
import { useClient } from "urql"

const useCart = () => {
  const client = useClient()
  const [cartData, cartQuery] = useGetCartQuery()
  const [_remove, removeMutation] = useRemoveCartItemMutation()
  const [_clear, clearMutation] = useClearCartMutation()

  const clearCart = async () => {
    clearMutation({ input: {} }).then(res => {
      const { data, error } = res
      if (data && cartData.operation) {
        client.reexecuteOperation(cartData.operation)
      }
      // TODO - Set errors
    })
  }

  const removeItem = async (input: RemoveItemsFromCartInput) => {
    removeMutation({ input }).then(res => {
      const { data, error } = res
      if (data && cartData.operation) {
        client.reexecuteOperation(cartData.operation)
      }
      // TODO - Set errors
    })
  }

  return { clearCart, removeItem }
}

export default useCart
