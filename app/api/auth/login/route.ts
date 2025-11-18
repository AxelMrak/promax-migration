import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginSchemaDef } from "@/features/auth/schema";
import { loginRequest } from "@/features/auth/services/login";
import { 
  ACCESS_COOKIE_NAME, 
  REFRESH_COOKIE_NAME,
  ACCESS_COOKIE_MAX_AGE,
  REFRESH_COOKIE_MAX_AGE 
} from "@/constants/auth";
import { ApiError } from "@/lib/api/client";

const IS_PROD = process.env.NODE_ENV === "production";

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = loginSchemaDef.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige inloggegevens" }, 
        { status: 400 }
      );
    }

    const tokens = await loginRequest(parsed.data);
    const cookieStore = await cookies();
    
    cookieStore.set(ACCESS_COOKIE_NAME, tokens.access, {
      httpOnly: true,
      secure: IS_PROD,
      path: "/",
      sameSite: "lax",
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });

    cookieStore.set(REFRESH_COOKIE_NAME, tokens.refresh, {
      httpOnly: true,
      secure: IS_PROD,
      path: "/",
      sameSite: "lax",
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    const error = err instanceof Error ? err : new Error("Inloggen mislukt");
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
