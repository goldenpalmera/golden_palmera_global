"use client";

import {
  useState,
  type SubmitEvent,
} from "react";


type QuoteFormProps = {
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



export default function QuoteForm({
  product = "",
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [reference, setReference] =
    useState("");

  const [state, setState] =
    useState<FormState>({
      status: "idle",
    });

  async function handleSubmit(
  event: SubmitEvent<HTMLFormElement>
) {
  event.preventDefault();

  if (loading) {
    return;
  }

  setLoading(true);

  setState({
    status: "submitting",
  });

  const form =
    event.currentTarget;

  const formData =
    new FormData(form);

  const payload = {
    type: "product",

    name: formData.get("name"),

    company: formData.get("company"),

    email: formData.get("email"),

    phone: formData.get("phone"),

    country: formData.get("country"),

    product: formData.get("product"),

    quantity: formData.get("quantity"),

    packaging: formData.get("packaging"),

    destination: formData.get("destination"),

    message: formData.get("message"),

    website: formData.get("website"),
  };

  try {
    const response =
      await fetch("/api/quote", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          payload
        ),
      });

    const contentType =
  response.headers.get("content-type");

if (!contentType?.includes("application/json")) {
  throw new Error(
    `Server returned ${response.status} instead of JSON.`
  );
}

const result =
  await response.json();

    if (!response.ok) {
      setState({
        status: "error",

        message:
          result.message ||
          "Unable to submit your enquiry.",

        errors:
          result.fields,
      });

      setLoading(false);

      return;
    }

    setReference(
      result.reference || ""
    );

    setState({
      status: "success",

      message:
        result.message ||
        "Your enquiry has been received.",

      reference:
        result.reference,
    });

    form.reset();

    setSubmitted(true);
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
  } finally {
    setLoading(false);
  }
}

  if (submitted) {
    return (
      <div
        className=" rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-emerald-600
            text-2xl
            text-white
          "
        >
          ✓
        </div>

        <h3 className="text-2xl font-semibold text-zinc-900">
          Enquiry Received
        </h3>
        
         <p className="mx-auto mt-3 max-w-md leading-7 text-zinc-600">
  Thank you for contacting
  Golden Palmera Global. Your
  enquiry has been received.<br></br>
  Our team will review
          your requirements and get back to you
          shortly.
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

            setReference("");

            setState({
              status: "idle",
            });
          }}
          className="
            mt-6
            text-sm
            font-semibold
            text-emerald-700
            hover:text-emerald-900
          "
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {state.status === "error" &&
        state.message && (
          <div
            role="alert"
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            {state.message}
          </div>
        )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Full Name"
          name="name"
          placeholder="Your full name"
          required
          error={state.errors?.name?.[0]}
        />

        <Field
          label="Company Name"
          name="company"
          placeholder="Company name"
          error={state.errors?.company?.[0]}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          error={state.errors?.email?.[0]}
        />
       
        <Field
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          placeholder="+234..."
          required
          error={state.errors?.phone?.[0]}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Country"
          name="country"
          placeholder="Country"
          required
          error={state.errors?.country?.[0]}
        />

        <Field
          label="Product"
          name="product"
          defaultValue={product}
          placeholder="Product you're interested in"
          required
          error={state.errors?.product?.[0]}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Quantity Required"
          name="quantity"
          placeholder="e.g. 20 MT"
          required
          error={state.errors?.quantity?.[0]}
        />

        <div>
          <label
            htmlFor="packaging"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-800
            "
          >
            Preferred Packaging
          </label>

          <select
            id="packaging"
            name="packaging"
            aria-invalid={
              !!state.errors?.packaging?.[0]
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-4
              text-sm
              text-zinc-700
              outline-none
              transition
              focus:border-emerald-600
              focus:ring-2
              focus:ring-emerald-600/10
            "
          >
            <option value="">
              Select packaging
            </option>

            <option value="bulk">
              Bulk
            </option>

            <option value="bags">
              Bags
            </option>

            <option value="drums">
              Drums
            </option>

            <option value="jerrycans">
              Jerrycans
            </option>

            <option value="custom">
              Custom requirement
            </option>
          </select>

          <FieldError
            message={
              state.errors?.packaging?.[0]
            }
          />
        </div>
      </div>

      <Field
        label="Destination Port / Country"
        name="destination"
        placeholder="e.g. Rotterdam, Netherlands"
        required
        error={state.errors?.destination?.[0]}
      />

      <div>
        <label
          htmlFor="message"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-800
          "
        >
          Additional Requirements
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={
            !!state.errors?.message?.[0]
          }
          placeholder="Tell us about your requirements, specifications, delivery timeline, etc."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-zinc-200
            bg-white
            p-4
            text-sm
            outline-none
            transition
            focus:border-emerald-600
            focus:ring-2
            focus:ring-emerald-600/10
          "
        />

        <FieldError
          message={state.errors?.message?.[0]}
        />
      </div>
      <div
  aria-hidden="true"
  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
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


      <button type="submit"
        disabled={loading}
        aria-disabled={loading}
        className="
          inline-flex
          h-13
          w-full
          items-center
          justify-center
          rounded-full
          bg-emerald-700
          px-7
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-emerald-800
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:w-auto
        "
      >
        {loading
          ? "Sending..."
          : "Submit Enquiry"}
      </button>

      <p
        className="
          text-xs
          leading-5
          text-zinc-500
        "
      >
        By submitting this form, you agree that
        Golden Palmera Global may contact you
        regarding your enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-sm
          font-medium
          text-zinc-800
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-emerald-700">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${name}-error`
            : undefined
        }
        className={`
          h-12
          w-full
          rounded-xl
          bg-white
          px-4
          text-sm
          outline-none
          transition
          focus:ring-2
          ${
            error
              ? "border border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600/10"
          }
        `}
      />

      <FieldError
        id={`${name}-error`}
        message={error}
      />
    </div>
  );
}

function FieldError({
  message,
  id,
}: {
  message?: string;
  id?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      className="mt-1.5 text-xs text-red-600"
    >
      {message}
    </p>
  );
}
