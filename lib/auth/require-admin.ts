import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const adminEmail =
    process.env.ADMIN_EMAIL?.toLowerCase();

  if (
    !adminEmail ||
    session.user.email.toLowerCase() !==
      adminEmail
  ) {
    redirect("/unauthorized");
  }

  return session.user;
}
