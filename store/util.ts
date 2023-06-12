export const initBoard = () => {
  const sortTag = localStorage.getItem('sortTag')
  let columnTypes: TypedColumn[] = []
  if (sortTag) {
    columnTypes = JSON.parse(sortTag)
  } else {
    columnTypes = ['todo', 'inprogress', 'done']
    localStorage.setItem('sortTag', JSON.stringify(columnTypes))
  }
  const columns = new Map<TypedColumn, Column>()
  for (const columnType of columnTypes) {
    columns.set(columnType, {
      id: columnType,
      todos: [],
    })
  }
  return columns
}
