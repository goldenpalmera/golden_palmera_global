import {
  NextResponse,
} from "next/server";

import {
  contactSchema,
} from "@/lib/validation/contact-validation";

import {
  generateRequestId,
} from "@/lib/security/request-id";

import {
  validateOrigin,
} from "@/lib/security/validate-origin";

import {
  getClientIp,
} from "@/lib/security/client-ip";

import {
  checkRateLimit,
} from "@/lib/security/rate-limit";
import { createContact } from "@/lib/contacts/create-contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId =
    generateRequestId();

  try {
    // validate request origin
    if (!validateOrigin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request origin.",
          requestId,
        },
        {
          status: 403,
        }
      );
    }

    // Parse request body
    let body: unknown;
    
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
          requestId,
        },
        {
          status: 400,
        }
      );
    }

    // validate input
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      console.error(`[${requestId}] Contact validation failed`, {
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          code: issue.code,
          message: issue.message,
        })),
        receivedKeys:
          body !== null &&
          typeof body === "object" &&
          !Array.isArray(body)
            ? Object.keys(body)
            : [],
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Please check the form and correct the highlighted fields.",

          fields:
            parsed.error.flatten().fieldErrors,

          requestId,
        },
        {
          status: 400,
        }
      );
    }

    const data = parsed.data;

    // Identify client
    const ip = getClientIp(request.headers);

    /**
     * Honeypot.
     *
     * We don't tell bots they were detected.
     */
    if (data.website) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Your enquiry has been received.",
        },
        {
          status: 200,
        }
      );
    }

    // Rate limit
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submissions. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "600",
          },
        }
      );
    }

    // Create inquiry
    const result = await createContact(data, {
          requestId,
          ip,
      });

      // Handle creation failure
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error,
          requestId,
        },
        {
          status: 500,
        }
      );
    }

    // Success
    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received.",
        reference: result.reference,
        requestId,
        ...(result.emailWarning
          ? {emailWarning: true}
          : {}),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
     if (
      error instanceof Error &&
      error.message === "All rate-limit backends are unavailable."
    ) {
      console.error(
        `[${requestId}] Rate-limit infrastructure unavailable.`
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Enquiry submission are temporarily unavailable. Please try again shortly.",
          requestId,
        },
        {
          status: 503,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }
    console.error(
      `[${requestId}] Contact API error`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your enquiry right now.",
        requestId,
      },
      {
        status: 500,
      }
    );
  }
}