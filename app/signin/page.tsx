'use client'
import { validateEmail } from '@/lib/helper'
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function Signin() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push('/')
  }
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const updateError = (type: 'email' | 'password', value: string) => {
    setError((state) => {
      return {
        ...state,
        [type]: value,
      }
    })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      if (!email) {
        updateError('email', '邮箱必填')
      }
      if (!password) {
        updateError('password', '密码必填')
      }
      return
    }
    if (!validateEmail(email)) {
      updateError('email', '邮箱格式错误')
      return
    }
    if (password.length > 20) {
      updateError('password', '密码最长为20位')
      return
    }
    // todo 验证信息, button loading
  }
  return (
    <div className="h-full w-full">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
      <div className="mx-auto max-w-lg text-center text-white mt-16">
        <h1 className="text-2xl font-bold sm:text-3xl">开启愉快的一天!</h1>
        <p className="mt-4">
          保持组织和高效轻松管理任务，GPT自动总结任务进度！
        </p>
      </div>
      <div className="max-w-md mx-auto p-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md">
          <div className="shadow-md rounded-lg">
            <label htmlFor="email" className="sr-only">
              邮箱
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                placeholder="输入邮箱"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  updateError('email', '')
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSymbolIcon className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>
          {error?.email && (
            <div className="text-[#F58700] flex gap-2 items-center text-sm mt-2">
              <ExclamationTriangleIcon className="w-5 h-5" /> {error.email}
            </div>
          )}

          <div className="shadow-md rounded-lg mt-4">
            <label htmlFor="password" className="sr-only">
              密码
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                placeholder="输入密码"
                onChange={(e) => {
                  setPassword(e.target.value)
                  updateError('password', '')
                }}
                value={password}
              />

              <button
                onClick={() => {
                  setShowPassword((state) => !state)
                }}
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          {error?.password && (
            <div className="text-[#F58700] flex gap-2 items-center text-sm mt-2">
              <ExclamationTriangleIcon className="w-5 h-5" /> {error.password}
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              登录或注册
            </button>
            {/* <p className="text-sm text-gray-500">忘记密码？</p> */}
          </div>
        </form>
        <div className="flex items-center gap-1 py-4 text-white before:h-[1px] before:bg-[#fafaff] before:flex-1 after:h-[1px] after:bg-[#fafaff] after:flex-1">
          或
        </div>
        <button
          className="bg-[#4b4d55] w-full rounded-md text-white py-2 cursor-pointer flex justify-center gap-2 hover:opacity-90"
          onClick={() => signIn('github', { callbackUrl })}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-slate-100"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
            ></path>
          </svg>
          github登录
        </button>
      </div>
    </div>
  )
}

export default Signin
