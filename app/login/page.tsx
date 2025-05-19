'use client'

import React from 'react'

export default function LoginPage() {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URI!

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  googleAuthUrl.searchParams.set('redirect_uri', googleRedirectUri)
  googleAuthUrl.searchParams.set('prompt', 'consent')
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('client_id', googleClientId)
  googleAuthUrl.searchParams.set('scope', 'profile email')
  googleAuthUrl.searchParams.set('access_type', 'offline')

  return (
    <div className="container">
      <h1 className="title">Sign in</h1>
      <a href={googleAuthUrl.toString()} className="btn">
        Sign in with Google
      </a>
    </div>
  )
}
