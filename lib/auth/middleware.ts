import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(
  (request) => {
    const pathname =
      request.nextUrl.pathname;

    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const user = request.auth?.user;

    if (!user) {
      return NextResponse.redirect(
        new URL(
          "/admin/login",
          request.nextUrl
        )
      );
    }

    const email = user.email?.toLowerCase();

    const adminEmail =
      process.env.ADMIN_EMAIL?.toLowerCase();

    if (!email || !adminEmail || email !== adminEmail) {
      return NextResponse.redirect(
        new URL(
          "/unauthorized",
          request.nextUrl
        )
      );
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
