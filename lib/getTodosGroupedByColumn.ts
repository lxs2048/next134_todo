import { databases } from '@/appwrite'

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  )
  const todos = data.documents
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      })
    }
    acc.get(todo.status)?.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      $updatedAt: todo.$updatedAt,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    })
    return acc
  }, new Map<TypedColumn, Column>())
  // 补充没有的类型=》
  const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done']
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      })
    }
  }
  let sortedColumns: Map<TypedColumn, Column>
  // 获取localStorage中的排序
  const sortTag = localStorage.getItem('sortTag')
  if (sortTag) {
    const sortTags = JSON.parse(sortTag)
    sortedColumns = new Map(
      Array.from(columns.entries()).sort(
        (a, b) => sortTags.indexOf(a[0]) - sortTags.indexOf(b[0])
      )
    )
  } else {
    sortedColumns = new Map(
      Array.from(columns.entries()).sort(
        (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
      )
    )
    localStorage.setItem('sortTag', JSON.stringify(columnTypes))
  }
  const board: Board = {
    columns: sortedColumns,
  }
  return board
}
