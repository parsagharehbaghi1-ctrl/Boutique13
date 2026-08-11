'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface AuthUser {
  name: string
  phone: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  hydrated: boolean
  login: (user: AuthUser) => void
  logout: () => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'boutique13-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
