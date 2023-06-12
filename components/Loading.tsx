'use client'
import classNames from 'classnames'
import { MoonLoader } from 'react-spinners'
function Loading() {
  return (
    <div
      className={classNames({
        'absolute w-screen h-screen z-50 flex justify-center items-center flex-col':
          true,
        'bg-opacity-0': true,
      })}
    >
      <MoonLoader size="80" color="#0055D1" />
    </div>
  )
}

export default Loading
