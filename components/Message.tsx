'use client'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FaceSmileIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
type Props = {
  messageInfo: MessageInfo
  closeFn: () => void
}
const Message = ({ messageInfo, closeFn }: Props) => {
  const { type, content, show, title } = messageInfo
  const nodeRef = useRef(null)
  const timeRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (!show) return
    timeRef.current = setTimeout(() => {
      closeFn && closeFn()
    }, 2500)
  }, [show])

  const getIcon = useCallback(() => {
    switch (type) {
      case 'success':
        return <FaceSmileIcon className="h-6 w-6 text-green-600" />
      case 'error':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
      default:
        return null
    }
  }, [type])

  return (
    <CSSTransition
      in={show}
      timeout={50}
      classNames="alert"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed right-4 top-4 rounded-xl border border-gray-100 bg-white p-4 shadow-xl"
      >
        <div
          className={classNames({
            'flex gap-4': true,
            'items-start': title,
            'items-center': !title,
          })}
        >
          {getIcon()}

          <div
            className={classNames({
              'flex-1': true,
              'items-center': !title,
            })}
          >
            {title && (
              <strong className="block font-medium mb-1 text-gray-900">
                {' '}
                {title}{' '}
              </strong>
            )}
            <div className="text-sm text-gray-700">{content}</div>
          </div>

          <button
            onClick={() => {
              clearTimeout(timeRef.current)
              timeRef.current = undefined
              closeFn && closeFn()
            }}
            className="text-gray-500 transition hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
export default Message
