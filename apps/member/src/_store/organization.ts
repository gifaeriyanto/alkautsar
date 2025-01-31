import { create } from 'zustand'

export interface UseOrganizationState {
  id: string
  save: (id: string) => void
}

export const useOrganization = create<UseOrganizationState>((set) => ({
  id: '',
  save: (id: string) => {
    set({ id })
  },
}))
