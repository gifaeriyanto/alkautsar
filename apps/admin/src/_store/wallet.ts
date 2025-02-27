import type { Tables } from '@client/supabase/types/database'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWallet = create(
  persist<
    Partial<Tables<'wallets'>> & {
      setWallet: (wallet: Partial<Tables<'wallets'>>) => void
    }
  >(
    (set) => ({
      id: '',
      name: '',
      setWallet: (wallet) => {
        set(wallet)
      },
    }),
    {
      name: 'wallet-storage', // Name for local storage key
    }
  )
)
