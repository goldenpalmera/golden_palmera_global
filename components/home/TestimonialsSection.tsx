import { SectionHeading } from "@/components/sharedComponents/index";
import type { HomeTestimonial } from "@/content/home/types";

type TestimonialsSectionProps = {
  testimonials: HomeTestimonial[];
};

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="bg-forest-800 py-20 lg:py-28 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Social Proof"
          heading="What Buyers Say"
          light
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-forest-900/60 border border-gold-500/10 rounded-lg p-6 flex flex-col"
            >
              <div className="text-gold-500 text-2xl font-serif mb-4 leading-none">
                &ldquo;
              </div>

              <p className="text-ivory-100/75 text-[13px] leading-relaxed flex-1 italic">
                {testimonial.quote}
              </p>

              <div className="mt-5 pt-4 border-t border-gold-500/10">
                {testimonial.isNamed &&
                  testimonial.name && (
                    <>
                      <div className="text-[11px] text-ivory-100">
                        {testimonial.name}
                      </div>

                      {testimonial.title && (
                        <div className="text-[10px] text-gold-500 mt-0.5">
                          {testimonial.title}
                        </div>
                      )}
                    </>
                  )}

                {testimonial.companyType && (
                  <div className="text-[10px] text-gold-500 font-medium">
                    {testimonial.companyType}
                  </div>
                )}

                {testimonial.country && (
									<div className="text-[10px] text-ivory-100/40 mt-0.5">
										{testimonial.country}
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}