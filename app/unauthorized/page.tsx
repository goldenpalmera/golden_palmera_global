import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl font-bold text-zinc-300">
          403
        </div>

        <h1 className="mt-4 text-2xl font-bold text-zinc-900">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          You do not have permission to access
          the Golden Palmera Global admin portal.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Return to website
        </Link>
      </div>
    </main>
  );
}
