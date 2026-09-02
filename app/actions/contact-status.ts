"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";

import { client } from "@/sanity/lib/client";

import {
  contactStatuses,
  type ContactStatus,
} from "@/lib/contacts/types";

export async function updateContactStatus(
  id: string,
  status: ContactStatus
) {
  // Require authentiction admin
  const admin = await requireAdmin();

  // validate contact id
  if (!id) {
    return {
      success: false as const,
      error: "Invalid contact.",
    };
  }

  // validate status
  if (!contactStatuses.includes(status)) {
    return {
      success: false as const,
      error: "Invalid contact status.",
    };
  }

  try {
    const existing =
      await client.fetch<{
        _id: string;
        status: ContactStatus;
      } | null>(
        `*[
          _type == "contact"
          && _id == $id
        ][0]{
          _id,
          status
        }`,
        { id }
      );

    if (!existing) {
      return {
        success: false as const,
        error: "Contact not found",
      };
    }

    // Nothing to update
    if (
      existing.status === status
    ) {
      return {
        success: true as const,
      };
    }

    await client
      .patch(id)
      .set({
        status,
      })
      .append(
        "statusHistory",
        [
          {
            _key: crypto.randomUUID(),
            status,
            changedAt: new Date().toISOString(),
            changedBy: admin.email ?? 'admin',
          },
        ]
      )
      .commit();

    revalidatePath("/admin/contacts");
    revalidatePath(`/admin/contacts/${id}`);

    return {
      success: true as const,
    };
  } catch (error) {
    console.log(
      "Failed to update contact status:",
      error
    );

    return {
      success: false as const,
      error: "Unable to update the contact status.",
    };
  }
}