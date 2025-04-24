import type { CartItem } from "~/types/cartItem.models"

export const useCalculateCart = () => {
  const calculateTotal = (cartStore: CartItem[], shipping: number) => {
    return cartStore.reduce((acc, val) => acc + val.produits.prix * val.quantity, 0) ?? 0 + shipping
  }

  const calculateTva = (price: number) => price * 0.2

  return {calculateTotal, calculateTva}
}
