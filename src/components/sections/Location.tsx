import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { googleMapsDirections, googleMapsEmbed, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Confirm } from "@/components/ui/Confirm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Location({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section-y" aria-labelledby={heading ? "find-us" : undefined}>
      <div className="container-x">
        {heading && (
          <div id="find-us">
            <SectionHeading eyebrow="Find us" title={<>Glasgow&rsquo;s<br />East End.</>} />
          </div>
        )}
        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-5">
          <Reveal className="bg-ink p-7 md:p-10 lg:col-span-2">
            <ul className="space-y-8">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-red-bright" />
                <div>
                  <p className="eyebrow text-steel">Address</p>
                  <address className="mt-2 text-lg not-italic leading-snug text-white">
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.city} {site.address.postcode}
                  </address>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-red-bright" />
                <div className="w-full">
                  <p className="eyebrow text-steel">
                    Opening hours
                    <Confirm />
                  </p>
                  <dl className="mt-2 space-y-1">
                    {site.hours.rows.map((r) => (
                      <div key={r.days} className="flex justify-between gap-6 text-white">
                        <dt>{r.days}</dt>
                        <dd className="font-mono">
                          {r.open}–{r.close}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-red-bright" />
                <div>
                  <p className="eyebrow text-steel">Call</p>
                  <a href={`tel:${site.contact.phoneE164}`} className="mt-2 block text-lg text-white hover:text-red-bright">
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-red-bright" />
                <div className="min-w-0">
                  <p className="eyebrow text-steel">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="mt-2 block break-all text-lg text-white hover:text-red-bright">
                    {site.contact.email}
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={googleMapsDirections} icon="external">
                Get directions
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Send a message
              </ButtonLink>
            </div>
          </Reveal>
          <div className="relative min-h-[22rem] bg-char lg:col-span-3">
            <iframe
              title="Map showing TKO Boxing & Performance Centre, 70 Strathclyde Street, Glasgow"
              src={googleMapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            />
            <a
              href={googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink/90 px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white backdrop-blur hover:bg-red"
            >
              Open in Google Maps <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
