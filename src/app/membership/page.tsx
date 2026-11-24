import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { MembershipCards, PassList } from "@/components/sections/MembershipCards";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Membership & Prices",
  description:
    "TKO Gold £60/month unlimited classes & gym access, TKO Bronze £40/month, Winter Unlimited £40/month, and £10 class, gym and sparring passes. Boxing gym prices in Glasgow.",
  alternates: { canonical: "/membership" },
};

const rows: [string, (string | boolean)[]][] = [
  ["Price", ["£40/mo", "£60/mo", "£40/mo", "£10"]],
  ["Group classes", ["Unlimited", "Unlimited", "2 per week", "1 class"]],
  ["Full gym access", [true, true, true, false]],
  ["Boxing, circuits & S&C", [true, true, true, true]],
  ["Rolling monthly", [true, true, true, false]],
];
const cols = ["Winter Unlimited", "TKO Gold", "TKO Bronze", "Class Pass"];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Membership"
        title={
          <>
            Commit to
            <br />
            the work.
          </>
        }
        intro="Straightforward monthly memberships with full gym access — or pay as you go from £10. Join online in minutes."
        image={media.barbellWoman}
      />

      <section className="section-y !pt-14" aria-labelledby="plans">
        <div className="container-x">
          <div id="plans" className="mb-14">
            <SectionHeading eyebrow="Monthly" title="Memberships." />
          </div>
          <MembershipCards />
          <p className="mt-6 text-sm text-steel">
            Billed monthly from your chosen start date. 30 days’ notice before the next billing date is required to
            cancel. Memberships are non-transferable; some classes or events may be excluded. Offers are available for
            a limited time.
          </p>
        </div>
      </section>

      <section className="section-y border-y border-line bg-coal" aria-labelledby="compare">
        <div className="container-x">
          <div id="compare" className="mb-10">
            <SectionHeading eyebrow="Compare" title="At a glance." />
          </div>
          <Reveal className="no-scrollbar -mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Membership comparison</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-line py-4 pr-4 font-mono text-[0.65rem] font-normal uppercase tracking-[0.16em] text-steel">
                    &nbsp;
                  </th>
                  {cols.map((c) => (
                    <th key={c} scope="col" className="border-b border-line px-4 py-4 text-left font-semibold text-white">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, vals]) => (
                  <tr key={label}>
                    <th scope="row" className="border-b border-line py-4 pr-4 font-normal text-steel">
                      {label}
                    </th>
                    {vals.map((v, i) => (
                      <td key={i} className="border-b border-line px-4 py-4 text-white">
                        {v === true ? (
                          <Check className="size-4 text-red-bright" aria-label="Included" />
                        ) : v === false ? (
                          <Minus className="size-4 text-steel" aria-label="Not included" />
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section-y" aria-labelledby="passes">
        <div className="container-x">
          <div id="passes" className="mb-10">
            <SectionHeading eyebrow="No commitment" title="Passes." intro="Try TKO before you commit — every pass is £10." />
          </div>
          <PassList />
        </div>
      </section>

      <section className="pb-20 lg:pb-32" aria-labelledby="membership-help">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 border border-line bg-char p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 id="membership-help" className="display-tight text-3xl text-white md:text-4xl">
                Not sure which is right?
              </h2>
              <p className="mt-3 max-w-xl text-steel">
                Tell us how often you want to train and what you’re aiming for — we’ll recommend the best option.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact?topic=membership">Membership enquiry</ButtonLink>
              <ButtonLink href="/booking#personal-training" variant="outline">
                Personal training
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
