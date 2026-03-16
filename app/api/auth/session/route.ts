import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("authjs.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionToken, "base64").toString("utf-8")
      );

      // Check if session is not expired (7 days)
      const iat = sessionData.iat || 0;
      const now = Date.now();
      const maxAge = 60 * 60 * 24 * 7 * 1000; // 7 days in ms

      if (now - iat > maxAge) {
        cookieStore.delete("authjs.session-token");
        return NextResponse.json({ user: null }, { status: 200 });
      }

      return NextResponse.json(
        {
          user: {
            id: sessionData.id,
            email: sessionData.email,
            name: sessionData.name,
            role: sessionData.role,
          },
        },
        { status: 200 }
      );
    } catch (parseError) {
      console.error("Failed to parse session token:", parseError);
      cookieStore.delete("authjs.session-token");
      return NextResponse.json({ user: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
