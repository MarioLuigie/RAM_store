// src/middleware.ts
// modules
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // SESSION CART ID FOR UNLOGGED USERS
  // Check sessionCartId exists
  const hasSessionCartId = request.cookies.has('sessionCartId')

  if (!hasSessionCartId) {
    const cartId = crypto.randomUUID() // Web API, run at Edge runtime
    console.log('🛒 Nowy sessionCartId:', cartId)

    // Set sessionCartId cookie if does not exist
    response.cookies.set({
      name: 'sessionCartId',
      value: cartId,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 dni
      httpOnly: true,
      sameSite: 'lax',
    })
  } else {
    console.log('🛒 sessionCartId already exists:')
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // pomiń /api, pliki statyczne itd.
}
