"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getSanityClient } from "@/sanity/lib/client";
import {
  inquiryStatuses,
  type InquiryStatus,
} from "@/lib/inquiries/types";

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
) {
  // Require authenticated admin
  const admin = await requireAdmin();

  // Validate inquire id
  if(!id) {
    return {
      success: false as const,
      error: "Invalid inquiry.",
    };
  }

  // validate status
  if (!inquiryStatuses.includes(status)) {
    return {
      success: false as const,
      error: "Invalid inquire status.",
    };
  }

  try {
  // Get existing inquire
    const client = getSanityClient();
    
    const existing =
      await client.fetch<{
        _id: string;
        status: InquiryStatus;
      } | null>(
        `*[_type == "inquiry" && _id == $id][0]{_id,status}`,
        { id }
      );

    if (!existing) {
      return {
        success: false as const,
        error: "Inquiry not found",
      }
    };

    // Nothing to change
    if (
      existing.status === status
    ) {
      return {
        success: true as const,
      };
    }


    // Update status and append audit history
    await client
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
              admin.email,
          },
        ]
      )
      .commit();

    // Revalidate cached inquiry data]
    revalidateTag("inquiries", "max");
    revalidateTag(`inquiry:${id}`, "max");
    revalidatePath("/admin/inquiries");

    revalidatePath(`/admin/inquiries/${id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.log(
      "Failed to update inquiry status:",
      error
    );

    return {
      success: false as const,
      error: "Unable to update the inquire status",
    }
  }
}
