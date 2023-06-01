import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn'
import { create } from 'zustand'

interface BearState {
  board: Board
  getBoard: () => void
}

export const useBoardStore = create<BearState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({ board })
  }
}))