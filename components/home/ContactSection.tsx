import type {
  HomeContactContent,
} from "@/content/home/types";

type ContactSectionProps = {
  content: HomeContactContent;
};

export function ContactSection({
  content,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="contact section"
    >
      <div
        className="contact-circle"
        aria-hidden="true"
      >
        <span>GPG</span>
      </div>

      <div className="contact-content">
        <div className="section-label">
          {content.label}
        </div>

        <h2>
          {content.heading}
          <br />
          <em>{content.headingAccent}</em>
        </h2>

        <p>{content.description}</p>

        <a
          href={`mailto:${content.email}`}
          className="primary-button light"
        >
          Start a conversation
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}
