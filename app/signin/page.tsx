'use client'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function Signin() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push('/')
  }
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  return (
    <div>
      <button onClick={() => signIn('github', { callbackUrl })}>
        github登录
      </button>
    </div>
  )
}

export default Signin
