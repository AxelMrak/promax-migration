import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants/auth";
import { isPublicPath, isAssetPath } from "@/lib/proxy/utils";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/reset-password", "/"];

export default function proxy(request: NextRequest): NextResponse {
  // 2. Check if the current route is protected or public
  const { pathname } = request.nextUrl;

  if (isAssetPath(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // 3. Decrypt the session from cookies (optimistic check)
  const hasAccessToken = Boolean(request.cookies.get(ACCESS_COOKIE_NAME));
  const hasRefreshToken = Boolean(request.cookies.get(REFRESH_COOKIE_NAME));
  const isAuthenticated = hasAccessToken && hasRefreshToken;

  // 4. Redirect to /login if the user is not authenticated and accessing protected route
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 5. Redirect to /dashboard if the user is authenticated and accessing public route (except root)
  if (
    isPublicRoute &&
    isAuthenticated &&
    !request.nextUrl.pathname.startsWith("/dashboard") &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
