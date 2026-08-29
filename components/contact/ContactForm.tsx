"use client";

import { useState, type SubmitEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      country: String(formData.get("country") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.message || "Something went wrong. Please try again."
        );
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);

      setError(
        "Unable to send your enquity right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
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

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setError("");
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
            disabled={isSubmitting}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Your name"
          />
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
            disabled={isSubmitting}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="you@company.com"
          />
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
            disabled={isSubmitting}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="phone/WhatsApp number"
          />
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
            disabled={isSubmitting}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Company name"
          />
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
            disabled={isSubmitting}
            className="w-full border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="E.g China, USA, Germany .."
          />
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
            disabled={isSubmitting}
            className="w-full resize-none border-b border-black/20 bg-transparent py-3 outline-none transition-colors placeholder:text-black/20 focus:border-[#8c6d35] disabled:opacity-50"
            placeholder="Tell us more about your requirements..."
          />
        </div>

        {error && (
          <div className="border border-red-900/10 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

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
          disabled={isSubmitting}
          className="group inline-flex items-center gap-5 bg-[#171717] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8c6d35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}

          {!isSubmitting && (
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}