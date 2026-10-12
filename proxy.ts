import { NextResponse } from "next/server";
import { auth } from "@/auth";

function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' https://cdn.sanity.io data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "media-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default auth((request) => {
  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  /*
   * Pass the nonce to the Next.js request so that
   * server-rendered content can access it when needed.
   */
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);

  const pathname = request.nextUrl.pathname;

  /*
   * Admin authorization
   */
  if (pathname !== "/admin/login") {
    const user = request.auth?.user;

    if (!user) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.nextUrl)
      );

      response.headers.set(
        "Content-Security-Policy-Report-Only",
        csp
      );

      return response;
    }

    const email = user.email?.toLowerCase();

    const adminEmail =
      process.env.ADMIN_EMAIL?.toLowerCase();

    if (
      !email ||
      !adminEmail ||
      email !== adminEmail
    ) {
      const response = NextResponse.redirect(
        new URL("/unauthorized", request.nextUrl)
      );

      response.headers.set(
        "Content-Security-Policy-Report-Only",
        csp
      );

      return response;
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy-Report-Only",
    csp
  );

  return response;
});

export const config = {
  matcher: [
    /*
     * Run on application pages while excluding
     * Next.js internals and static files.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};