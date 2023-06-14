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
    const GPTdata = await res.json()
    const { content } = GPTdata
    return content
  } catch (error) {
    return ''
  }
}
