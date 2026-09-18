import type { Metadata } from "next";

import Footer from "@/components/sharedComponents/Footer";
import PageHero from "../components/PageHero";

import { SupplyChainSection } from "@/components/home";
import {
  getFeaturedLeader,
  normalizeLeadership,
  normalizeSupplyChain,
  normalizeOurStory,
} from "@/content/about/normalizeAboutData";
import {
  AboutStats,
  FeaturedQuote,
  LeadershipSection,
  MissionSection,
  OurStorySection,
  WhoWeAreSection,
  AboutCTA,
} from "@/components/about";

import { getTeamMembers } from "@/content/about/getTeamMembers";
import { getAboutPageMetadata } from "@/content/about/metadata";
import { getAboutPage } from "@/content/about/getAboutPage";
export async function generateMetadata(): Promise<Metadata> {
  return await getAboutPageMetadata();
}

export default async function AboutPage() {
  const [aboutData, teamMembers] = await Promise.all([
    getAboutPage(),
    getTeamMembers(),
  ]);

  const page = aboutData?.page ?? null;
  const supplyChain = normalizeSupplyChain(
    aboutData?.supplyChain
  );

  const team = normalizeLeadership(teamMembers);

  const story = normalizeOurStory(page);

  const featured = getFeaturedLeader(
    page?.featuredLeader, 
    team
  );

  return (
    <>
      <main className="bg-[#f8f6f0] text-[#171717]">
        {/* Hero */}
        <PageHero
          eyebrow={
            page?.heroEyebrow ||
            "About Golden Palmera Global"
          }
          title={
            page?.heroTitle ||
            "From African agriculture to global markets."
          }
          description={
            page?.heroDescription ||
            "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging, and exporting quality products to markets around the world."
          }
        />

        {/* Who We Are */}
        <WhoWeAreSection
          eyebrow={
            page?.whoWeAreEyebrow ||
            "Who we are"
          }
          title={
            page?.whoWeAreTitle ||
            "Building a trusted bridge between producers and the world."
          }
          paragraphs={
            page?.whoWeAreParagraphs?.length
              ? page.whoWeAreParagraphs
              : undefined
          }
        />

        {/* Our Story */}
        <OurStorySection {...story} />

        {/* Company Stats */}
        <AboutStats stats={page?.stats} />

        {/* Supply Chain */}
        <SupplyChainSection steps={supplyChain} />

        {/* Leadership */}
        <LeadershipSection team={team} />

        {/* Featured Quote */}
        {featured?.quote && (
          <FeaturedQuote member={featured} />
        )}

        {/* Mission */}
        <MissionSection
          eyebrow={
            page?.missionEyebrow ||
            "Our mission"
          }
          title={
            page?.missionTitle ||
            "Creating value from farm to international market."
          }
          description={
            page?.missionDescription ||
            "We aim to strengthen agricultural value chains while delivering quality commodities and professional export solutions to buyers around the world."
          }
        />

        {/* CTA */}
        <AboutCTA />
      </main>

      <Footer />
    </>
  );
}
