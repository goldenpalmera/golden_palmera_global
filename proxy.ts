import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

function generateNonce() {
  return Buffer.from(randomBytes(16)).toString("base64");
}

function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
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
  ].join("; ");
}

export default auth((request) => {
  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    csp
  );

  const pathname = request.nextUrl.pathname;

  /*
   * Only protect /admin routes.
   * Public GPG pages must remain publicly accessible.
   */
  if (pathname.startsWith("/admin")) {
    /*
     * The login page is intentionally public.
     */
    if (pathname !== "/admin/login") {
      const user = request.auth?.user;

      if (!user) {
        const response = NextResponse.redirect(
          new URL("/admin/login", request.nextUrl)
        );

        response.headers.set(
          "Content-Security-Policy",
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
          "Content-Security-Policy",
          csp
        );

        return response;
      }
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  /*
   * CSP is currently Report-Only while we verify
   * the application.
   */
  response.headers.set(
    "Content-Security-Policy",
    csp
  );

  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};