'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

interface WishlistState {
  items: WishlistItem[]
  hydrated: boolean
  toggle: (item: WishlistItem) => boolean
  remove: (id: string) => void
  has: (id: string) => boolean
  setHydrated: () => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      toggle: (item) => {
        const items = get().items
        const exists = items.some((i) => i.id === item.id)
        if (exists) {
          set({ items: items.filter((i) => i.id !== item.id) })
          return false
        } else {
          set({ items: [...items, item] })
          return true
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      has: (id) => get().items.some((i) => i.id === id),
      setHydrated: () => set({ hydrated: true }),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'boutique13-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
