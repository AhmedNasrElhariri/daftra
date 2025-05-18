// src/stores/useOrderStore.js
import { create } from "zustand";

const useOrderStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id);
    if (existing) {
      // increase quantity
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...get().cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },

  changeQuantity: (id, action) => {
    set({
      cart: get()
        .cart.map((item) => {
          if (item.id === id) {
            const newQty =
              action === "increase"
                ? item.quantity + 1
                : Math.max(0, item.quantity - 1);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    });
  },

  clearCart: () => set({ cart: [] }),
}));
export default useOrderStore;
