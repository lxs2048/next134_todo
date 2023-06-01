'use client'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'
function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ])
  useEffect(() => {
    getBoard()
  }, [getBoard])
  console.log(board, '数据😎😎😎board')
  return <div>Board</div>
}

export default Board
