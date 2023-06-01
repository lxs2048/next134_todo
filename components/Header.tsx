'use client'
import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/* 优先设置小屏幕样式，使用md适配中等屏幕（通常是宽度大于或等于768px） */}
        <Image
          src="https://heroicons.com/_next/static/media/beams.1fcfd97b.jpg"
          alt="heroicons bg"
          width={300}
          height={100}
          priority={true}
          className="w-44 md:w-56 pb-8 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="张三" size="45" round color="#0055D1" />
        </div>
      </div>
    </header>
  )
}

export default Header
