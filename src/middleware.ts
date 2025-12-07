import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  // For development, we'll use a more permissive CSP that allows 'unsafe-inline'
  // This is because Next.js in development mode injects inline scripts for HMR
  const isDevelopment = process.env.NODE_ENV === 'development'

  let cspHeader: string

  if (isDevelopment) {
    // Development CSP - more permissive for HMR and inline scripts
    cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' ws: wss:",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  } else {
    // Production CSP - strict with nonce
    // Generate a nonce for CSP
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    // Clone the response to add the nonce
    const response = NextResponse.next()

    cspHeader = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')

    response.headers.set('Content-Security-Policy', cspHeader)
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    // Add nonce to response headers for potential use in server components
    response.headers.set('x-nonce', nonce)

    return response
  }

  // Clone the response
  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', cspHeader)

  // Add other security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except API routes and static assets
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}