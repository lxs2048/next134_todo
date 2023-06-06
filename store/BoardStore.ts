import { ID, databases, storage } from '@/appwrite'
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn'
import { uploadImage } from '@/lib/uploadImage'
import { create } from 'zustand'

interface BearState {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void

  searchString: string
  setSearchString: (searchString: string) => void

  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void

  newTaskInput: string
  setNewTaskInput: (newTaskInput: string) => void
  newTaskType: TypedColumn
  setNewTaskType: (id: TypedColumn) => void
  image: ImageFile | null
  setImage: (image: ImageFile | null) => void

  addTask: (todo: string, columnId: TypedColumn, image?: ImageFile | null) => Promise<void>
}

export const useBoardStore = create<BearState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    )
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns)

    newColumns.get(id)?.todos.splice(taskIndex, 1)
    set({
      board: {
        columns: newColumns
      }
    })
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
    )
  },
  newTaskInput: '',
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),
  newTaskType: 'todo',
  setNewTaskType: (id) => set({ newTaskType: id }),
  image: null,
  setImage: (image) => set({ image }),
  addTask: async (todo, columnId, image) => {
    let file: Image | undefined
    const fileUploaded = await uploadImage(image)
    if (fileUploaded && image) {
      file = {
        bucketId: fileUploaded.bucketId,
        fileId: fileUploaded.$id,
        meta: image.meta
      }
    }
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) })
      }
    )
    set({ newTaskInput: '' })
    set({ image: null })

    set((state) => {
      const newColumns = new Map(state.board.columns)
      const newTodo: Todo = {
        $id,
        title: todo,
        status: columnId,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        ...(file && { image: file })
      }
      const column = newColumns.get(columnId)
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        })
      } else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }
      return {
        board: {
          columns: newColumns
        }
      }

    })
  }
}))