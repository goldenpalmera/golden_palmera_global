export function validateOrigin(
  request: Request
) {
  const origin =
    request.headers.get("origin");

  if (!origin) {
    return false;
  }

  const allowedOrigins =
    process.env.ALLOWED_ORIGINS
      ?.split(",")
      .map((origin) =>
        origin.trim().replace(/\/$/, "")
      )
      .filter(Boolean) ?? [];

  return allowedOrigins.includes(
    origin.replace(/\/$/, "")
  );
}
