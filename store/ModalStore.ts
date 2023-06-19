import { create } from 'zustand'

interface BearState {
  isOpen: boolean
  loading: boolean
  setLoading: (bool: boolean) => void
  openModal: () => void
  closeModal: () => void
}

export const useModalStore = create<BearState>((set, get) => ({
  isOpen: false,
  loading: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => {
    if (get().loading) return
    set({ isOpen: false })
  },
  setLoading: (bool) => set({ loading: bool }),
}))
