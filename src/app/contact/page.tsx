import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { Instagram } from "@/components/icons/Instagram";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm, ContactFormWithParams } from "@/components/forms/ContactForm";
import { Location } from "@/components/sections/Location";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Contact TKO Boxing & Performance Centre — Unit 8, 70 Strathclyde Street, Glasgow G40 4JR. Call 07472 913333 or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: Phone, label: "Call", value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneE164}` },
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Instagram, label: "Instagram", value: site.social.instagramHandle, href: site.social.instagram },
  ];
  return (
    <>
      <PageHero
        index="08"
        eyebrow="Contact"
        title={
          <>
            Come and
            <br />
            say hello.
          </>
        }
        intro="Questions about classes, memberships, kids’ boxing or personal training? Message the team, give us a call, or just drop in."
        image={media.gymFloor}
      />

      <section className="section-y !pt-12" aria-label="Contact options">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ul className="grid gap-px border border-line bg-line">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 80} className="bg-ink">
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-5 p-6 transition-colors hover:bg-char"
                  >
                    <span className="inline-flex size-12 shrink-0 items-center justify-center border border-line transition-colors group-hover:border-red group-hover:bg-red">
                      <c.icon className="size-5 text-white" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block text-steel">{c.label}</span>
                      <span className="mt-1 block break-all text-white">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Reveal className="border border-line bg-coal p-6 sm:p-8 md:p-10">
              <h2 className="display-tight mb-8 text-3xl text-white md:text-4xl">Send a message</h2>
              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <Location />
      </div>
    </>
  );
}
