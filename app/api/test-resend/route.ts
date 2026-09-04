// app/api/test-resend/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(
      process.env.RESEND_API_KEY
    );

    const { data, error } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["delivered@resend.dev"],
        subject: "Resend connection test",
        html: "<p>Resend is working.</p>",
      });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "RESEND EXCEPTION:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
