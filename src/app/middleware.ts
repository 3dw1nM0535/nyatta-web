import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log(req)
  return NextResponse.redirect('/404')
}

export const config = {
  matcher: ["/property/:path*", "/listings/:path*"],
}
