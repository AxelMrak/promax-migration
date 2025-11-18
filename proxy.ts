import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants/auth";
import { isProtectedPath, isAssetPath } from "@/lib/proxy/utils";

export default function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isAssetPath(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const hasAccessToken = Boolean(request.cookies.get(ACCESS_COOKIE_NAME));
  const hasRefreshToken = Boolean(request.cookies.get(REFRESH_COOKIE_NAME));
  const isAuthenticated = hasAccessToken && hasRefreshToken;

  // Redirect to /login if not authenticated and accessing protected route
  if (isProtectedPath(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to /dashboard if authenticated and accessing public route (not protected)
  if (!isProtectedPath(pathname) && isAuthenticated && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
