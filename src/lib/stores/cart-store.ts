'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  qty: number
  slug: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  hydrated: boolean
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (index: number) => void
  updateQty: (index: number, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  setHydrated: () => void
  getTotal: () => number
  getCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      addItem: (item, qty = 1) => {
        const items = get().items
        const existingIndex = items.findIndex(
          (i) => i.id === item.id && i.color === item.color && i.size === item.size
        )
        if (existingIndex >= 0) {
          const newItems = [...items]
          newItems[existingIndex].qty += qty
          set({ items: newItems })
        } else {
          set({ items: [...items, { ...item, qty }] })
        }
        set({ isOpen: true })
      },
      removeItem: (index) => {
        const items = get().items
        set({ items: items.filter((_, i) => i !== index) })
      },
      updateQty: (index, delta) => {
        const items = get().items
        const newItems = [...items]
        if (newItems[index]) {
          newItems[index].qty += delta
          if (newItems[index].qty <= 0) {
            set({ items: items.filter((_, i) => i !== index) })
          } else {
            set({ items: newItems })
          }
        }
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setHydrated: () => set({ hydrated: true }),
      getTotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
      },
      getCount: () => {
        return get().items.reduce((sum, i) => sum + i.qty, 0)
      },
    }),
    {
      name: 'boutique13-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
