import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin/inquiries");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-xl font-bold text-white">
              GP
            </div>

            <h1 className="mt-6 text-2xl font-bold text-zinc-900">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Sign in to manage Golden Palmera
              Global inquiries.
            </p>
          </div>

          <form
            action={async () => {
              "use server";

              await signIn("google", {
                redirectTo:
                  "/admin/inquiries",
              });
            }}
            className="mt-8"
          >
            <button
              type="submit"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                bg-zinc-900
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-zinc-800
              "
            >
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-zinc-400">
            Authorized personnel only.
          </p>
        </div>
      </div>
    </main>
  );
}
