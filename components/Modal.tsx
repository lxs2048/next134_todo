'use client'
import { ChangeEvent, FormEvent, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { ScaleLoader } from 'react-spinners'

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null)
  const [isOpen, closeModal, loading, setLoading] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
    state.loading,
    state.setLoading,
  ])
  const [newTaskType, newTaskInput, setNewTaskInput, image, setImage, addTask] =
    useBoardStore((state) => [
      state.newTaskType,
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
    ])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    await addTask(newTaskInput, newTaskType, image)
    setLoading(false)
    closeModal()
  }
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files![0].type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.src = event.target?.result as string
      img.onload = () => {
        setImage({
          file: e.target.files![0],
          meta: {
            w: img.naturalWidth,
            h: img.naturalHeight,
          },
        })
      }
    }
    reader.readAsDataURL(e.target.files![0])
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as={'form'}
        className="relative z-10"
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  添加任务
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="请输入任务..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <TaskTypeRadioGroup />
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click()
                    }}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    上传图片
                  </button>
                  {image && (
                    <Image
                      alt="上传图片"
                      width={200}
                      height={200}
                      src={URL.createObjectURL(image.file)}
                      onClick={() => {
                        setImage(null)
                      }}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150"
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    添加任务
                    {loading && (
                      <ScaleLoader
                        color={'#1E3A8A'}
                        loading={true}
                        height={10}
                        width={4}
                      />
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
