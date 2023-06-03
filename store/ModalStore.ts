import { create } from 'zustand'

interface BearState {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export const useModalStore = create<BearState>((set, get) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}))