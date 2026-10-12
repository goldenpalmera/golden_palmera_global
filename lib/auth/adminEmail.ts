export function isAdminEmail(
  email: string | null | undefined
): boolean {
  if (!email) return false;

  const adminEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  if (!adminEmail) return false;

  return (
    email.trim().toLowerCase() ===
    adminEmail
  );
}