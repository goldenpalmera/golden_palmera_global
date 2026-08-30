"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  serverClient,
} from "@/sanity/lib/server-client";

import {
  contactStatuses,
  type ContactStatus,
} from "@/lib/contacts/types";

export async function updateContactStatus(
  id: string,
  status: ContactStatus
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error(
      "Unauthorized."
    );
  }

  if (
    !contactStatuses.includes(status)
  ) {
    throw new Error(
      "Invalid contact status."
    );
  }

  const existing =
    await serverClient.fetch<{
      _id: string;
      status: ContactStatus;
    } | null>(
      `*[
        _type == "contactSubmission"
        && _id == $id
      ][0]{
        _id,
        status
      }`,
      { id }
    );

  if (!existing) {
    throw new Error(
      "Contact message not found."
    );
  }

  if (
    existing.status === status
  ) {
    return {
      success: true,
    };
  }

  await serverClient
    .patch(id)
    .set({
      status,
    })
    .append(
      "statusHistory",
      [
        {
          _key:
            crypto.randomUUID(),

          status,

          changedAt:
            new Date().toISOString(),

          changedBy:
            session.user.email,
        },
      ]
    )
    .commit();

  revalidatePath(
    "/admin/contacts"
  );

  revalidatePath(
    `/admin/contacts/${id}`
  );

  return {
    success: true,
  };
}