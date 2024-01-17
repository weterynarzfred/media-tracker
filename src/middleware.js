import { NextResponse } from 'next/server';

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/media')) {
    const url = req.nextUrl.clone();
    url.pathname = '/api' + req.nextUrl.pathname;
    return NextResponse.rewrite(url);
  }
}
