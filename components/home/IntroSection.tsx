import type {
  HomeIntroContent,
} from "@/content/home/types";

type IntroSectionProps = {
  content: HomeIntroContent;
};

export function IntroSection({
  content,
}: IntroSectionProps) {
  return (
    <section id="about" className="intro section">
      <div className="section-label">
        {content.label}
      </div>

      <div className="intro-grid">
        <h2>
          {content.heading}
          <span>{content.headingAccent}</span>
        </h2>

        <div>
          <p className="large-copy">
            {content.largeCopy}
          </p>

          <p>{content.body}</p>

          <a
            href={content.linkHref}
            className="arrow-link"
          >
            {content.linkText}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
