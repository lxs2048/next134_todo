import { formatTodosForAI } from './formatTodosForAI'

export const fetchSuggestion = async (board: Board, name: stringCommon) => {
  try {
    const todos = await formatTodosForAI(board)
    const res = await fetch('/api/generateSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todos, name }),
    })
    const GPTData = await res.json()
    const { content } = GPTData
    return content
  } catch (error) {
    return ''
  }
}
