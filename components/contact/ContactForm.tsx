"use client";

import { useState, type SubmitEvent } from "react";


type FormState = {
  status:
    | "idle"
    | "submitting"
    | "success"
    | "error";

  message?: string;
  reference?: string;
  errors?: Record<string, string[] | undefined>;
};


export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<FormState>({ status: "idle" })

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.status === "submitting") return

    setState({
      status: "submitting",
    })

    const form = event.currentTarget;
    const formData = new FormData(form);

    const getValue = (filename: string) => 
        formData.get(filename)?.toString() ?? "";

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      company: getValue("company"),
      country: getValue("country"),
      message: getValue("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error(
          `Server returned ${response.status} instead of JSON.`
        );
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        setState({
          status: "error",
          message: result.message || "Unable to submit your enquiry.",
          errors: result.fields,
        });

        return;
      }

      setState({
        status: "success",
        message: result.message || "Your enquiry has been received.",
        reference: result.reference,
      });

      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);

      setState({
        status: "error",
        message: 
          "Unable to submit your enquiry right now. Please try again."
      });
    }
  };
  console.log("contact form", state.reference)
  const fieldError = (field: string) => state.errors?.[field]?.[0];
  console.log(state)
  if (submitted) {
    console.log(state)
    console.log("submi")
    return (
      <div className="border border-black/10 bg-[#f5f1e8] p-8 md:p-12">
        <span className="font-mono text-xs text-[#8c6d35]">
          THANK YOU
        </span>

        <h3 className="mt-8 text-4xl font-medium tracking-[-0.04em]">
          Your enquiry has been received.
        </h3>

        <p className="mt-5 max-w-lg text-sm leading-7 text-black/55">
          We&apos;ll review your message and get back to you as soon as
          possible.
        </p>

        {state.reference && (
          <div className="mx-auto mt-5 max-w-sm rounded-xl border border-emerald-200 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Your reference
            </p>

            <p className="mt-1 font-mono text-lg font-semibold text-emerald-700">
              {state.reference}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setState({
              status: "idle",
            })
          }}
          className="mt-10 border-b border-black/30 pb-2 text-xs uppercase tracking-[0.2em]"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/10 bg-[#f5f1e8] p-6 md:p-10 lg:p-12"
    >
      {state.status === "error" && state.message && (
        <div className=" rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
            {state.message}
        </div>
      )}

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
          Get in touch
        </p>

        <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] md:text-5xl">
          Tell us what
          <br />
          you&apos;re looking for.
        </h2>
      </div>

      <div className="space-y-8">
        <div>
          <label
            htmlFor="name"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={state.status === "submitting"}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Your name"
            aria-invalid={!!fieldError("name")}
            aria-describedby={fieldError("name") ? "name-error" : undefined}
          />
          {fieldError("name") && (
            <p 
              className="mt-2" text-xs text-red-600 
              id="name-error"
            >
              {fieldError("name")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={state.status === "submitting"}
            aria-invalid={!!fieldError("email")}
            aria-describedby={fieldError("email") ? "email-error" : undefined}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="you@company.com"
          />
          {fieldError("email") && (
            <p
              className="mt-2 text-xs text-red-600"
              id="email-error"
            >
              {fieldError("email")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="phone"
            required
            disabled={state.status === "submitting"}
            aria-invalid={!!fieldError("phone")}
            aria-describedby={fieldError("phone") ? "phone-error" : undefined}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="phone/WhatsApp number"
          />
          {fieldError("phone") && (
            <p
              className="mt-2 text-xs text-red-600"
              id="email-error"
            >
              {fieldError("phone")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            disabled={state.status === "submitting"}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Company name"
            aria-invalid={!!fieldError("company")}
            aria-describedby={fieldError("company") ? "company-error" : undefined}
          />
          {fieldError("company") && (
            <p
              className="mt-2 text-xs text-red-600"
              id="email-error"
            >
              {fieldError("company")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Country
          </label>

          <input
            id="country"
            name="country"
            type="text"
            disabled={state.status === "submitting"}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="E.g China, USA, Germany .."
            aria-invalid={!!fieldError("country")}
            aria-describedby={fieldError("country") ? "country-error" : undefined}
          />
          {fieldError("country") && (
            <p
              className="mt-2 text-xs text-red-600"
              id="email-error"
            >
              {fieldError("country")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-black/45"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={state.status === "submitting"}
            className="w-full resize-none border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Tell us more about your requirements..."
            aria-invalid={ !!fieldError("message") }
            aria-describedby={fieldError("message") ? "message-error" : undefined}
          />
          {fieldError("message") && (
            <p
              className="mt-2 text-xs text-red-600"
              id="email-error"
            >
              {fieldError("message")}
            </p>
          )}
        </div>

        {/**Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 overflow-hidden"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="group inline-flex items-center gap-5 bg-[#171717] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8c6d35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending..." : "Send enquiry"}

          {state.status !== "submitting" && (
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}