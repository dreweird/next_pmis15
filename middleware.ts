import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/encoder/:path*", "/reviewer/:path*", "/budget*"];

export default async function middleware(request: NextRequest) {

    // Log every request
  console.log(`[${request.method}] ${request.url}`);


  // Capture POST requests specifically
  if (request.method === 'POST') {
    // You can inspect headers, body, etc.
    console.log('POST request detected');
    console.log('Headers:', Object.fromEntries(request.headers));

    // ⚠️ Note: You cannot directly read the body in middleware
    // because it's streaming. If you need body parsing, handle it
    // inside an API route instead.
  }

  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
