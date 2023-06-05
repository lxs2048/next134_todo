'use client'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { PlusIcon } from '@heroicons/react/24/solid'

function FixedAdd() {
  const setNewTaskType = useBoardStore((state) => state.setNewTaskType)
  const openModal = useModalStore((state) => state.openModal)
  const handleAddTodo = () => {
    setNewTaskType('todo')
    openModal()
  }
  return (
    <div
      onClick={handleAddTodo}
      className="fixed bottom-6 md:bottom-8 right-5 h-10 w-10 rounded-full bg-[#0055D1] flex justify-center items-center shadow-md hover:bg-[#417cd5] cursor-pointer"
    >
      <PlusIcon className="text-white h-6 w-6" />
    </div>
  )
}

export default FixedAdd
