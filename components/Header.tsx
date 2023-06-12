'use client'
import {
  MagnifyingGlassIcon,
  QueueListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect, useState } from 'react'
import { fetchSuggestion } from '@/lib/fetchSuggestion'
import Link from 'next/link'
import { useDebounceFn } from 'ahooks'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth/core/types'
import SignInButton from './SignInButton'
type Props = {
  session: Session | null
}
function Header(props: Props) {
  const { session } = props
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ])
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  const fetchSuggestionFunc = async () => {
    const suggestion = await fetchSuggestion(board)
    setSuggestion(suggestion)
    setLoading(false)
  }

  const { run } = useDebounceFn(
    () => {
      fetchSuggestionFunc()
    },
    {
      wait: 2000,
    }
  )
  useEffect(() => {
    if (board.columns.size === 0) return
    setLoading(true)
    run()
  }, [board])
  console.log(session, '数据😎😎😎session')
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
        {/* 优先设置小屏幕样式，使用md适配中等屏幕（通常是宽度大于或等于768px） */}
        <Link
          className="flex justify-center items-center text-white pb-4 md:pb-0"
          href="/"
        >
          <QueueListIcon className="inline-block h-8 w-8" />
          <span className="font-bold ml-2">Todo</span>
        </Link>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="搜索"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              搜索
            </button>
          </form>
          <SignInButton />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-3 md:py-5">
        <div className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <div>
            <UserCircleIcon
              className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
                loading && 'animate-spin'
              }`}
            />
          </div>
          {suggestion && !loading ? suggestion : 'GPT正在为您总结今天的任务...'}
        </div>
      </div>
    </header>
  )
}

export default Header
