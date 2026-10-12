"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronUp,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingButtonsData } from "@/content/float-button/types";

type FloatingButtonsProps = {
  settings: FloatingButtonsData;
};

export function FloatingButtons({
  settings,
}: FloatingButtonsProps) {
  const [expanded, setExpanded] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const {
    enabled = true,
    whatsapp,
    phoneCall,
    toggleLabel = "Contact options",
    closeLabel = "Close contact options",
  } = settings;

  const whatsappEnabled =
    whatsapp?.enabled !== false &&
    Boolean(whatsapp?.number);

  const phoneEnabled =
    phoneCall?.enabled !== false &&
    Boolean(phoneCall?.calendlyUrl);

  const hasOptions =
    whatsappEnabled || phoneEnabled;

  if (!enabled || !hasOptions) {
    return null;
  }

  const whatsappMessage =
    whatsapp?.message ??
    "Hello, I'd like to enquire about your commodity export services.";

  const waLink = whatsapp
    ? `https://wa.me/${whatsapp.number.replace(
        /\D/g,
        ""
      )}?text=${encodeURIComponent(whatsappMessage)}`
    : "#";

  const openCalendly = () => {
    setExpanded(false);
    setShowCalendly(true);
  };

  return (
    <>
      {/* ─────────────────────────────────────────
          Calendly Dialog
      ───────────────────────────────────────── */}
      {phoneEnabled && phoneCall && (
        <Dialog.Root
          open={showCalendly}
          onOpenChange={setShowCalendly}
        >
          <Dialog.Portal>
            <Dialog.Overlay
              className="
                fixed inset-0 z-[200]
                bg-forest-950/80
                backdrop-blur-sm

                data-[state=open]:animate-in
                data-[state=closed]:animate-out
                data-[state=open]:fade-in-0
                data-[state=closed]:fade-out-0
              "
            />

            <Dialog.Content
              className="
                fixed left-1/2 top-1/2 z-[201]

                w-[calc(100%-2rem)]
                max-w-2xl
                max-h-[90vh]

                -translate-x-1/2
                -translate-y-1/2

                overflow-hidden
                overflow-y-auto

                rounded-xl
                border border-gold-500/20
                bg-forest-900
                shadow-2xl
                outline-none

                data-[state=open]:animate-in
                data-[state=closed]:animate-out
                data-[state=open]:fade-in-0
                data-[state=closed]:fade-out-0
                data-[state=open]:zoom-in-95
                data-[state=closed]:zoom-out-95

                sm:w-[calc(100%-3rem)]
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  border-b
                  border-forest-800
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <div className="min-w-0">
                  <Dialog.Title
                    className="
                      font-serif
                      text-lg
                      text-ivory-100
                    "
                  >
                    {phoneCall.title ??
                      "Book a Trade Consultation"}
                  </Dialog.Title>

                  <Dialog.Description
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-ivory-100/50
                    "
                  >
                    {phoneCall.description ??
                      "Schedule a phone call with our trade desk."}
                  </Dialog.Description>
                </div>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close booking dialog"
                    className="
                      shrink-0
                      rounded-md
                      p-2
                      text-ivory-100/40
                      transition-colors
                      hover:bg-forest-800
                      hover:text-ivory-100
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-gold-500
                    "
                  >
                    <X
                      size={20}
                      aria-hidden="true"
                    />
                  </button>
                </Dialog.Close>
              </div>

              {/* Calendly */}
              <div className="p-3 sm:p-6">
                <iframe
                  src={phoneCall.calendlyUrl}
                  title="Schedule a phone call"
                  loading="lazy"
                  className="
                    h-[500px]
                    w-full
                    rounded-lg
                    border
                    border-forest-700
                    bg-forest-950
                  "
                />
              </div>

              {/* Fallback */}
              <div
                className="
                  border-t
                  border-forest-800
                  px-5
                  py-4
                  text-center
                  sm:px-6
                "
              >
                <a
                  href={phoneCall.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-xs
                    text-gold-500
                    underline
                    underline-offset-2
                    transition-colors
                    hover:text-gold-400
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-gold-500
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-forest-900
                  "
                >
                  {phoneCall.fallbackLabel ??
                    "Open booking page in a new tab →"}

                  <span className="sr-only">
                    {" "}
                    (opens in a new tab)
                  </span>
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      {/* ─────────────────────────────────────────
          Floating Controls
      ───────────────────────────────────────── */}
      <div
        className="
          fixed
          bottom-6
          right-4
          z-[100]
          flex
          flex-col
          items-end
          gap-3
          sm:right-6
        "
      >
        {/* Contact options */}
        <div
          id="floating-contact-options"
          aria-hidden={!expanded}
          className={cn(
            "flex flex-col items-end gap-3",
            "transition-all duration-300",
            "motion-reduce:transition-none",

            expanded
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          )}
        >
          {/* WhatsApp */}
          {whatsappEnabled && whatsapp && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                whatsapp.label ??
                "Chat with the trade desk on WhatsApp"
              }
              tabIndex={expanded ? 0 : -1}
              className="
                group
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-forest-700
                  bg-forest-900/90
                  px-3
                  py-1.5
                  text-[11px]
                  text-ivory-100/70
                  shadow-lg
                  backdrop-blur-sm
                  transition-opacity

                  group-hover:opacity-100
                  sm:opacity-0
                  sm:group-focus-visible:opacity-100
                "
              >
                {whatsapp.label ??
                  "WhatsApp Trade Desk"}
              </span>

              <span
                aria-hidden="true"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#25D366]
                  shadow-lg
                  transition-colors
                  hover:bg-[#1ebe5d]

                  group-focus-visible:outline-none
                  group-focus-visible:ring-2
                  group-focus-visible:ring-[#25D366]
                  group-focus-visible:ring-offset-2
                  group-focus-visible:ring-offset-forest-950
                "
              >
                <MessageCircle
                  size={20}
                  fill="white"
                  stroke="white"
                />
              </span>
            </a>
          )}

          {/* Phone / Calendly */}
          {phoneEnabled && phoneCall && (
            <button
              type="button"
              onClick={openCalendly}
              aria-label={
                phoneCall.label ??
                "Book a phone call"
              }
              tabIndex={expanded ? 0 : -1}
              className="
                group
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-forest-700
                  bg-forest-900/90
                  px-3
                  py-1.5
                  text-[11px]
                  text-ivory-100/70
                  shadow-lg
                  backdrop-blur-sm
                  transition-opacity

                  group-hover:opacity-100
                  sm:opacity-0
                  sm:group-focus-visible:opacity-100
                "
              >
                {phoneCall.label ??
                  "Book a phone call"}
              </span>

              <span
                aria-hidden="true"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gold-500/30
                  bg-forest-800
                  shadow-lg
                  transition-all

                  hover:border-gold-500
                  hover:bg-forest-700

                  group-focus-visible:outline-none
                  group-focus-visible:ring-2
                  group-focus-visible:ring-gold-500
                  group-focus-visible:ring-offset-2
                  group-focus-visible:ring-offset-forest-950
                "
              >
                <Phone
                  size={20}
                  className="text-gold-500"
                />
              </span>
            </button>
          )}
        </div>

        {/* Main toggle */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="floating-contact-options"
          aria-label={
            expanded
              ? closeLabel
              : toggleLabel
          }
          onClick={() =>
            setExpanded((current) => !current)
          }
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full",
            "shadow-xl transition-all duration-300",
            "motion-reduce:transition-none",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-gold-500",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-forest-950",

            expanded
              ? "border border-gold-500/50 bg-forest-700"
              : "bg-gold-500 hover:bg-gold-400"
          )}
        >
          {expanded ? (
            <X
              size={22}
              className="text-ivory-100"
              aria-hidden="true"
            />
          ) : (
            <ChevronUp
              size={22}
              className="text-forest-950"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </>
  );
}
