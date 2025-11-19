import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants/auth";
import { ApiError } from "@/lib/api/error";
import { IS_PROD } from "@/constants/env";
import { setCookie } from "@/lib/cookies";

export async function POST() {
  try {
    /* NOT AVAILABLE ON BACKEND await logoutRequest(); */

    await setCookie(ACCESS_COOKIE_NAME, "", {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: -1,
    });

    await setCookie(REFRESH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: -1,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const error = err instanceof Error ? err : new Error("Uitloggen mislukt");
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
