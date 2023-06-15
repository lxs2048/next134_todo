interface Board {
  columns: Map<TypedColumn, Column>
}
type TypedColumn = 'todo' | 'inprogress' | 'done'
interface Column {
  id: TypedColumn
  todos: Todo[]
}
interface Todo {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  status: TypedColumn
  image?: Image
}

interface ImgMeta {
  w: number
  h: number
}
interface Image {
  bucketId: string
  fileId: string
  meta: ImgMeta
}

interface ImageFile {
  file: File
  meta: ImgMeta
}

interface AppwriteUserExtension {
  $id?: string
  $createdAt?: string
  $updatedAt?: string
  $permissions?: any[]
  $collectionId?: string
  $databaseId?: string
}

type stringCommon = string | null | undefined

interface UserBase {
  name: stringCommon
  email: stringCommon
  image: stringCommon
}

type User = UserBase & AppwriteUserExtension

type MessageInfo = {
  show: boolean
  type: 'success' | 'error' | 'warning'
  title?: stringCommon
  content: string
}
