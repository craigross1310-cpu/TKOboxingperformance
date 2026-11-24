import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { faqs } from "@/content/faqs";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "FAQ — Beginners, Booking, Membership",
  description:
    "Do I need experience? How do I book? How much is it? Answers to the questions people ask before their first session at TKO Boxing & Performance Centre, Glasgow.",
  alternates: { canonical: "/faq" },
};

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => f.verified)
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHero
        index="05"
        eyebrow="Questions"
        title={
          <>
            Before your
            <br />
            first round.
          </>
        }
        intro="Everything you need to know about starting at TKO — experience, booking, memberships and what to expect."
        image={media.glovesFloor}
      />
      <section className="section-y !pt-12" aria-label="Frequently asked questions">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqAccordion faqs={faqs} />
          </div>
          <aside className="lg:col-span-4">
            <Reveal className="rounded-2xl border border-line bg-char p-7 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <MessageSquare className="size-8 text-red-bright" aria-hidden />
              <h2 className="display-tight mt-5 text-3xl text-white">Still got a question?</h2>
              <p className="mt-3 text-steel">The coaches are happy to help — get in touch any time.</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-3 text-white hover:text-red-bright">
                    <Phone className="size-4" /> {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all text-white hover:text-red-bright">
                    <Mail className="size-4 shrink-0" /> {site.contact.email}
                  </a>
                </li>
              </ul>
              <ButtonLink href="/contact" className="mt-8 w-full">
                Send a message
              </ButtonLink>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
