interface Board {
    columns: Map<TypedColumn, Column>
}
type TypedColumn = "todo" | "inprogress" | "done"
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
    w: number,
    h: number,
}
interface Image {
    bucketId: string
    fileId: string
    meta: ImgMeta
}

interface ImageFile {
    file: File,
    meta: ImgMeta
}