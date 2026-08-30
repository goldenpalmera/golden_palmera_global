import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-semibold text-zinc-900">
              Golden Palmera Global
            </p>

            <p className="text-xs text-zinc-500">
              Admin Portal
            </p>
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <Link
              href="/admin/inquiries"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              Inquiries
            </Link>

            <Link
              href="/admin/contacts"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              Contact Messages
            </Link>
          </nav>

          <LogoutButton />
        </div>

        <nav className="flex border-t border-zinc-100 px-4 py-2 sm:hidden">
          <Link
            href="/admin/inquiries"
            className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          >
            Inquiries
          </Link>

          <Link
            href="/admin/contacts"
            className="flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          >
            Contacts
          </Link>
        </nav>
      </header>

      {children}
    </div>
  );
}