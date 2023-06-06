import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { useSize } from 'ahooks'
import { useRef } from 'react'
type Props = {
  id: TypedColumn
  todos: Todo[]
  index: number
}
const idToColumnText: {
  [key in TypedColumn]: string
} = {
  todo: '未开始',
  inprogress: '进行中',
  done: '已完成',
}

function Column({ id, todos, index }: Props) {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ])
  const ColumnRef = useRef(null)
  const size = useSize(ColumnRef)
  const openModal = useModalStore((state) => state.openModal)
  const handleAddTodo = () => {
    setNewTaskType(id)
    openModal()
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="bg-white/50 p-2 rounded-2xl shadow-sm">
            <h2 className="flex justify-between font-bold text-sm p-2">
              {idToColumnText[id]}
              <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                {!searchString
                  ? todos.length
                  : todos.filter((todo) =>
                      todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    ).length}
              </span>
            </h2>
            {/* render droppable todos in the column */}
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`rounded-md min-h-[72px] ${
                    snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                  }`}
                >
                  <div className="w-full h-full" ref={ColumnRef}>
                    {todos.map((todo, index) => {
                      if (
                        searchString &&
                        !todo.title
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      )
                        return null
                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              columnSize={size}
                            />
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <div className="flex items-end justify-end p-2 mt-2">
              <button
                className="text-green-500 hover:text-green-600"
                onClick={handleAddTodo}
              >
                <PlusCircleIcon className="h-10 w-10" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Column
