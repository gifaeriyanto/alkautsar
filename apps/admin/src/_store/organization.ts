import { create } from 'zustand'

export interface UseLocationState {
  id: string
}

export const useOrganization = create<UseLocationState>(() => ({
  id: '',
}))
