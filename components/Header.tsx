'use client'
import Image from 'next/image'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect, useState } from 'react'
import { fetchSuggestion } from '@/lib/fetchSuggestion'
function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ])
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  useEffect(() => {
    if (board.columns.size === 0) return
    setLoading(true)
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board)
      setSuggestion(suggestion)
      setLoading(false)
    }
    fetchSuggestionFunc()
  }, [board])
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
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
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="张三" size="45" round color="#0055D1" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && 'animate-spin'
            }`}
          />
          {suggestion && !loading ? suggestion : 'GPT正在为您总结今天的任务...'}
        </p>
      </div>
    </header>
  )
}

export default Header
