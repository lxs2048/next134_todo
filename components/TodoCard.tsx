'use client'
import { getUrl } from '@/lib/getUrl'
import { useBoardStore } from '@/store/BoardStore'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
type Props = {
  todo: Todo
  index: number
  id: TypedColumn
  innerRef: (element: HTMLElement | null) => void
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  columnSize?: { width: number; height: number }
}
function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
  columnSize,
}: Props) {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageMeta, setImageMeta] = useState<ImgMeta | null>(null)
  useEffect(() => {
    if (todo.image) {
      if (todo.image.meta) {
        setImageMeta(todo.image.meta)
      }
      const fetchImage = async () => {
        const url = await getUrl(todo.image!)
        if (url) {
          setImageUrl(url.toString())
        }
      }
      fetchImage()
    }
  }, [todo])
  const imageHight = useMemo(() => {
    if (imageMeta && columnSize) {
      return (imageMeta.h * columnSize.width) / imageMeta.w
    }
    return 0
  }, [imageMeta, columnSize])
  return (
    <div
      className="bg-white rounded-md mb-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => deleteTask(index, todo, id)}
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/* 配置blurDataURL占位 */}
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          {/* 图片占位 https://png-pixel.com/ */}
          <Image
            src={imageUrl}
            alt="任务图片"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            style={{ minHeight: imageHight }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOs7DioAQAFMAHs+PnY0wAAAABJRU5ErkJggg=="
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard
