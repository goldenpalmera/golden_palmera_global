import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "./adminEmail";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  if (!isAdminEmail(session.user.email)) {
    redirect("/unauthorized");
  }

  return session.user;
}
