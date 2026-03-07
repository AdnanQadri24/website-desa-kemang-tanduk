import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminCookie = request.cookies.get('admin_access')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // Jika mencoba masuk ke /admin tapi tidak punya cookie, lempar ke /login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!adminCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Jika sudah login tapi malah mau ke /login lagi, lempar ke /admin
  if (isLoginPage && adminCookie) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

// Aturan: Middleware ini hanya aktif untuk folder /admin dan /login
export const config = {
  matcher: ['/admin/:path*', '/login'],
}