"use client";

import {
  useState,
  type SubmitEvent,
} from "react";

type InquiryType =
  | "partnership"
  | "export_buyer";

type InquiryFormProps = {
  type: InquiryType;
  product?: string;
};

type FormState = {
  status:
    | "idle"
    | "submitting"
    | "success"
    | "error";

  message?: string;

  reference?: string;

  errors?: Record<
    string,
    string[] | undefined
  >;
};

const formCopy = {
  general: {
    eyebrow: "General enquiry",
    title: "Tell us how we can help.",
    description:
      "Whether you have a question, need more information, or want to discuss a potential opportunity, send us a message.",
    button: "Send enquiry",
  },

  product: {
    eyebrow: "Request a quote",
    title: "Tell us what you need.",
    description:
      "Share your commodity requirements and our team will review your request and respond with the appropriate next steps.",
    button: "Request quotation",
  },

  partnership: {
    eyebrow: "Strategic partnership",
    title: "Let’s build something together.",
    description:
      "Tell us about your organisation, your market and the opportunity you have in mind.",
    button: "Submit partnership enquiry",
  },

  export_buyer: {
    eyebrow: "International buyer",
    title: "Tell us what you need.",
    description:
      "Give us the details of your commodity requirements, destination and specifications so we can understand your request.",
    button: "Submit buyer enquiry",
  },
};

export default function InquiryForm({
  type,
  product,
}: InquiryFormProps) {
  const [state, setState] =
    useState<FormState>({
      status: "idle",
    });

  const copy = formCopy[type];

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (state.status === "submitting") {
      return;
    }

    setState({
      status: "submitting",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);

  const getValue = (name: string) =>
    formData.get(name)?.toString() ?? "";

  const payload = {
    type,

    name: getValue("name"),
    email: getValue("email"),
    phone: getValue("phone"),
    company: getValue("company"),
    country: getValue("country"),
    subject: getValue("subject"),

    product: getValue("product"),
    quantity: getValue("quantity"),
    packaging: getValue("packaging"),
    destination: getValue("destination"),

    organizationType: getValue("organizationType"),
    market: getValue("market"),
    companyWebsite: getValue("companyWebsite"),
    partnershipFocus: getValue("partnershipFocus"),

    message: getValue("message"),

    website: getValue("website"),
  };


    try {
      const response = await fetch(
        "/api/inquiry",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const contentType = response.headers.get(
        "content-type"
      );

      if (!contentType?.includes("application/json")) {
        throw new Error(
          `Server returned ${response.status} instead of JSON.`
        );
      }

      const result = await response.json();

      if (!response.ok || result.status === "error") {
        setState({
          status: "error",
          message:
            result.message ||
            "Unable to submit your enquiry.",
          errors: result.fields,
        });

        return;
      }

      setState({
        status: "success",
        message:
          result.message ||
          "Your enquiry has been received.",
        reference:
          result.reference,
      });

      form.reset();
    } catch (error) {
      console.error(
        "Inquiry submission failed:",
        error
      );

      setState({
        status: "error",
        message:
          "Unable to submit your enquiry right now. Please try again.",
      });
    }
  }

  {/** Success Message */}
  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite"
        className="min-h-[500px] border border-emerald-200 bg-emerald-50 p-8 md:p-12">
        <div aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#173f2b] text-xl text-white">
          ✓
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
          Received
        </p>

        <h2 className="mt-5 max-w-xl text-4xl font-medium leading-tight tracking-[-0.04em] text-[#173f2b] md:text-5xl">
          Thank you for getting in touch.
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-7 text-emerald-950/65">
          {state.message ||
            "Your enquiry has been received. Our team will review it and get back to you as soon as possible."}
        </p>

        {state.reference && (
          <div className="mt-8 inline-flex flex-col border border-emerald-900/10 bg-white px-5 py-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/40">
              Reference
            </span>

            <span className="mt-1 font-mono text-sm font-semibold text-[#173f2b]">
              {state.reference}
            </span>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => {
              setState({
                status: "idle",
              });
            }}
            className="mt-10 border-b border-[#173f2b]/30 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#173f2b]"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const error = (field: string) => state.errors?.[field]?.[0];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-live="polite"
      aria-busy={state.status === "submitting"}
      className="border border-black/10 bg-[#f5f1e8] p-6 md:p-10 lg:p-12"
    >
      {/* Header */}
      <div className="border-b border-black/10 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8c6d35]">
          {copy.eyebrow}
        </p>

        <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.04em] md:text-4xl">
          {copy.title}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
          {copy.description}
        </p>
      </div>

      <input
        type="hidden"
        name="type"
        value={type}
      />

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">
          Website
        </label>

        {/* Honeypot field to catch bots */}
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/** Server Error message */}
      {state.status === "error" &&
        state.message && (
          <div 
            role="alert" aria-live="assertive"
            className="mt-8 border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-700">
            {state.message}
          </div>
        )}

        {/** Hidden type field */}
        <input
          type="hidden"
          name="type"
          value={type}
        />

      {/* Contact details */}
      <div className="mt-10">
        <SectionLabel>
          Your details
        </SectionLabel>

        <div className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            name="name"
            autoComplete="name"
            required
            disabled={state.status === "submitting"}
            error={error("name")}
            placeholder="Your full name"
          />

          <Field
            id="email"
            label="Email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            disabled={state.status === "submitting"}
            required
            error={error("email")}
            placeholder="you@company.com"
          />

          <Field
            id="phone"
            label="Phone / WhatsApp"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            disabled={state.status === "submitting"}
            error={error("phone")}
            placeholder="+234..."
          />

          <Field
            id="company"
            label="Company"
            name="company"
            disabled={state.status === "submitting"}
            autoComplete="organization"
            error={error("company")}
            placeholder="Company name"
          />

          <Field
            id="country"
            label="Country"
            name="country"
            autoComplete="country-name"
            disabled
            error={error("country")}
            placeholder="Country"
          />

          
          <Field
            id="subject"
            label="Subject"
            name="subject"
            error={error("subject")}
            placeholder={
              type === "partnership"
                ? "Partnership opportunity"
                : type === "export_buyer"
                  ? "Commodity requirement"
                  : "How can we help?"
            }
          />
        </div>
      </div>

      {/* Requirements */}
      {(type === "export_buyer") && (
        <div className="mt-12 border-t border-black/10 pt-10">
          <SectionLabel>
            Commodity requirements
          </SectionLabel>

          <div className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            <Field
            id="product"
              label={
                type === "export_buyer"
                  ? "Product required"
                  : "Product"
              }
              name="product"
              defaultValue={product}
              required
              error={error("product")}
              placeholder="e.g. Sesame seed"
            />

            <Field
              id="quantity"
              label="Quantity"
              name="quantity"
              type="text"
              inputMode="text"
              error={error("quantity")}
              placeholder="e.g. 50 MT"
            />

            <Field
              id="packaging"
              label="Packaging"
              name="packaging"
              error={error("packaging")}
              placeholder="e.g. 25kg bags"
            />

            <Field
              id="destination"
              label="Destination"
              name="destination"
              error={error("destination")}
              placeholder="Country / port"
            />
          </div>
        </div>
      )}

      {/* Partnership information */}
      {type === "partnership" && (
        <div className="mt-12 border-t border-black/10 pt-10">
          <SectionLabel>
            Partnership details
          </SectionLabel>

          <div className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            <Field
              id="organizationType"
              label="Organisation type"
              name="organizationType"
              type="text"
              inputMode="text"
              placeholder="e.g. Distributor, importer"
              error={error(
                "organizationType"
              )}
            />

            <Field
              id="market"
              label="Market / region"
              name="market"
              placeholder="e.g. West Africa"
              error={error("market")}
            />

            <Field
              id="companyWebsite"
              label="Website"
              name="companyWebsite"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://..."
              error={error(
                "companyWebsite"
              )}
            />

            <Field
              id="partnershipFocus"
              label="Partnership focus"
              name="partnershipFocus"
              placeholder="What would you like to explore?"
              error={error(
                "partnershipFocus"
              )}
            />
          </div>
        </div>
      )}

      {/* Message */}
      <div className="mt-12 border-t border-black/10 pt-10">
        <SectionLabel>
          Your message
        </SectionLabel>

        <div className="mt-6">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
          >
            Additional information
            <span aria-hidden="true" 
              className="ml-1 text-[#b7924a]"
            >
              *
            </span>
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={7}
            disabled={ state.status === "submitting" } 
            aria-invalid={ !!error("message") } 
            aria-describedby={ error("message") ? "message-error" : undefined } 
            className={[ 
              "mt-3", 
              "min-h-[160px]", 
              "w-full", 
              "resize-y", 
              "border", 
              "bg-white", 
              "px-4", 
              "py-4", 
              "text-base", 
              "leading-7", 
              "outline-none", 
              "transition", 
              "focus-visible:border-[#b7924a]", 
              "focus-visible:ring-2", 
              "focus-visible:ring-[#b7924a]/20", 
              "disabled:cursor-not-allowed", 
              "disabled:opacity-50", 
              error("message") ? "border-red-400" : "border-black/10", 
            ].join(" ")} 
            placeholder={ 
              type === "export_buyer" 
              ? 
                "Tell us about your commodity requirements, specifications and any other important details..." 
              : type === "partnership" 
                ? 
                  "Tell us about your organisation, the opportunity and what you would like to explore with us..." 
                : "Tell us how we can help..." 
            }
          />

          {error("message") && (
            <p role="alert" 
              id="message-error"
              className="mt-2 text-xs text-red-600">
              {error("message")}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-10 flex flex-col gap-5 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-5 text-black/40">
          By submitting this form, your information
          will be reviewed by the Golden Palmera Global
          team.
        </p>

        <button
          type="submit"
          disabled={
            state.status === "submitting"
          }
          className="group inline-flex shrink-0 items-center justify-center gap-5 bg-[#173f2b] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#24583d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "submitting"
            ? "Sending..."
            : copy.button}

          {state.status !== "submitting" && (
            <span aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c6d35]">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  inputMode,
  autoComplete,
  required,
  disabled,
  placeholder,
  defaultValue,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "url";
  inputMode?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
      >
        {label}

        {required && (
          <span aria-hidden="true" className="ml-1 text-[#b7924a]">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={[ 
          "mt-3", 
          "min-h-11", 
          "w-full", 
          "border", 
          "bg-white", 
          "px-4", 
          "py-4", 
          "text-base", 
          "outline-none", 
          "transition", 
          "placeholder:text-black/25", 
          "focus-visible:border-[#b7924a]", 
          "focus-visible:ring-2", 
          "focus-visible:ring-[#b7924a]/20", 
          error ? "border-red-400" : "border-black/10", 
        ].join(" ")}
      />

      {error && (
        <p id={errorId} role="alert"
          className="mt-2 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
