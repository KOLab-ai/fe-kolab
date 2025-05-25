import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')

  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!accessToken) {
      // Redirect to login page if no access token is present
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Check if the user is trying to access auth pages while logged in
  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (accessToken) {
      // Redirect to dashboard if user is already logged in
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
} 