"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          callbackUrl: "/admin/login",
        })
      }
      className="
        rounded-xl
        border
        border-zinc-200
        bg-white
        px-4
        py-2
        text-sm
        font-semibold
        text-zinc-700
        transition
        hover:bg-zinc-50
      "
    >
      Sign out
    </button>
  );
}
