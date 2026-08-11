'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useAuthStore } from '@/lib/stores/auth-store'

/** Ensures Zustand persisted stores are hydrated before rendering dependent UI */
export function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
    useWishlistStore.persist.rehydrate()
    useAuthStore.persist.rehydrate()
  }, [])

  return null
}
