'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Signin() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || undefined
  return (
    <div>
      <button onClick={() => signIn('github', { callbackUrl })}>
        github登录
      </button>
    </div>
  )
}

export default Signin
