
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

function generateNonce(): string {
  return randomBytes(16).toString("base64");
}


function buildStudioCsp(): string {
  return [
    "default-src 'self'",
    [
      "script-src 'self' 'unsafe-inline'",
      "https://core.sanity-cdn.com",
      "https://*.sanity-cdn.com",
      "https://*.sanity.io",
      "https://sanity.io",
    ].join(" "),
    [
      "style-src 'self' 'unsafe-inline'",
      "https://*.sanity.io",
      "https://*.sanity-cdn.com",
      "https://design-system-static.sanity.io",
    ].join(" "),
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' https://cdn.sanity.io https://*.sanity.io data: blob:",
    [
      "font-src 'self' data:",
      "https://design-system-static.sanity.io",
      "https://studio-static.sanity.io",
      "https://*.sanity.io",
    ].join(" "),
    [
      "connect-src 'self'",
      "https://*.sanity.io",
      "https://sanity.io",
      "https://*.sanity-cdn.com",
    ].join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "media-src 'self' https://*.sanity.io https://*.sanity-cdn.com",
  ].join("; ");
}

function buildCsp(nonce: string): string {
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
  const pathname = request.nextUrl.pathname;
  const isStudio =
    pathname === "/studio" ||
    pathname.startsWith("/studio/");
  const csp = isStudio
    ? buildStudioCsp()
    : buildCsp(nonce);

  // Pass the nonce and CSP to Next.js for nonce-aware rendering.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  // Attach the enforced policy to every response from this proxy.
  const withCsp = (response: NextResponse): NextResponse => {
    response.headers.set("Content-Security-Policy", csp);
    response.headers.delete("Content-Security-Policy-Report-Only");
    return response;
  };

  // Only protect /admin routes. Keep the login page public.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const user = request.auth?.user;

    if (!user) {
      return withCsp(
        NextResponse.redirect(
          new URL("/admin/login", request.nextUrl),
        ),
      );
    }

    const email = user.email?.toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

    if (!email || !adminEmail || email !== adminEmail) {
      return withCsp(
        NextResponse.redirect(
          new URL("/unauthorized", request.nextUrl),
        ),
      );
    }
  }

  return withCsp(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }),
  );
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};