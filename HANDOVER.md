# TKO Boxing & Performance Centre — Website Handover

A premium multi-page website demo for **TKO Boxing & Performance Centre**, Glasgow.
Built with Next.js 16, TypeScript and Tailwind CSS v4. It reads TKO's live class schedule from TeamUp.

**Live demo:** https://tko-boxing-performance-centre.vercel.app (Vercel project `tko-boxing-performance-centre`)

---

## 1. Research summary

Research date: 24 November 2026. Every fact on the site comes from the public sources below.

| Source | What it gave us |
| --- | --- |
| **TeamUp booking page** (`goteamup.com/p/10870265-tko-boxing-performance-ce`) — the gym's booking platform | Business description, email, phone, address, logo, all membership & pass prices, 26 class types with descriptions and age limits, coach profiles (Gary & Kieran Tarleton), booking rules (opens 7 days before, 24h cancellation, 30 days' membership notice), and the live weekly schedule |
| **Companies House** | Legal name *TKO Boxing & Performance Centre Ltd*, company no. SC846554, incorporated 28 April 2025 |
| **TKO (supplied directly)** | Opening hours: Mon–Fri 6am–9pm, Saturday 6am–4pm, Sunday 6am–3pm |
| **Directory listings** (The Combat Network, Studiomaps) | Google rating of 5.0 from 12 reviews |
| **Instagram** (@tkoboxingperformancecentre) | Bio from search snippet: "All levels boxing — men, women & kids. Professional & amateur licensed coaches". **Posts and photos could not be read without logging in.** |

**Who TKO is:** a new (2025), **family-run** boxing and strength & conditioning gym in Glasgow's East End. Gary Tarleton owns it, and his son Kieran coaches alongside him (relationship confirmed by the client). Gary is a BBBC-licensed professional coach and cornerman with 20+ years' experience. Kieran is a retired professional boxer with 13 years in the sport. The positioning is "Real training. Real results. All levels welcome": professional-level coaching that is open to complete beginners, men, women and kids.

**Audience:** local adults (beginners through to amateur and pro boxers), people looking for fitness or HYROX-style conditioning, parents (kids' classes), and personal training clients.

**Verified weekly timetable** (it ran unchanged from 28 Sep to 7 Dec 2026):

| Day | Morning | Evening |
| --- | --- | --- |
| Mon | 06:00 Pads Class (Gary & Kieran) | 18:00 Beginners Boxing (Gary & Kieran) |
| Tue | 07:00 TKO HYROX Circuit | 18:00 Pads, Bags & Circuits |
| Wed | 06:00 Pads Class (Gary & Kieran) | 18:00 Pads & Bags (Gary & Kieran) |
| Thu | 06:00 Boxing Strength & Conditioning | 18:00 TKO Circuit |
| Fri | 06:00 Pads Class (Gary & Kieran) | 18:00 Beginners Boxing (Gary & Kieran) |
| Sat | 09:00 Pads & Bags (Gary) · 11:00 TKO All Levels Sparring (Gary & Kieran) | — |
| Sun | 09:00 All Levels Boxing (Gary) | — |

---

## 2. Pages & features built

| Page | Path | Highlights |
| --- | --- | --- |
| Home | `/` | Cinematic hero, verified stats, offer pillars, weekly timetable, coaches, gym section, Google rating + Instagram, memberships & passes, FAQ preview, booking call-to-action, map & contact |
| Classes | `/classes` | 9 weekly classes plus 8 programme classes (kids, ladies, technical and more), with type/level filters. Each shows level, duration, ages, coach, focus, who it suits, weekly times and a booking button. Includes a "Not sure where to start?" box |
| Timetable | `/timetable` | **Live from TeamUp**: this week and next week, day tabs on mobile and a 7-day grid on desktop. Filters by class type and coach, highlights today, marks finished/full/cancelled sessions. Tapping a session opens a detail drawer that links straight to that class on TeamUp |
| Coaches | `/coaches` | Profile cards that open full profiles (bio, credentials, specialities, PT offer, classes coached) with "Train with…" buttons that pre-select the coach in the PT form |
| About | `/about` | Story, training philosophy, facilities, what makes TKO different, community, map |
| FAQ | `/faq` | 16 questions in 5 categories, searchable, with an empty state and FAQ structured data |
| Book | `/booking` | Six booking routes, a 4-step guide, **TeamUp embedded in the page** (classes and passes), and the PT enquiry form |
| Start here | `/start` | New-member journey: a goal picker that recommends classes, what to expect, what to bring, how to book |
| Membership | `/membership` | Membership cards, comparison table, £10 passes, terms, membership enquiry |
| Contact | `/contact` | Contact form (`?topic=kids` etc. pre-selects the topic), phone/email/Instagram, map, hours |

**Throughout the site:** floating glass header and mobile booking dock (shown after the hero, hidden over the footer, safe-area aware on iPhone), back-to-top button, accessible mobile menu, page transitions, scroll-reveal animations (these respect reduced-motion settings), keyboard-accessible modals, skip link, SEO metadata on every page, Open Graph image, sitemap, robots.txt and LocalBusiness/ExerciseGym structured data.

**QA results:** production build passes, lint is clean, and there are 0 console errors. All internal links and anchors resolve. There is no horizontal scrolling at 390px (mobile) or 1440px (desktop). Tested: timetable, filters, drawers, modals, forms, FAQ search, mobile menu.

---

## 3. Booking platform integration

TKO uses **TeamUp**, so the site is built around it:

| Capability | How it's used |
| --- | --- |
| Live schedule | `src/lib/booking/teamup.ts` reads TKO's **public** TeamUp schedule (the same data the public TeamUp page shows, with no login). It is cached for 15 minutes. If TeamUp is unreachable, the timetable shows the verified weekly pattern and says so. |
| Book a specific class | Each session's **Book** button opens that exact class on TeamUp, where the customer logs in, pays and gets confirmation. |
| Buy memberships / passes | Buttons link to the exact TeamUp membership pages (Gold, Bronze, Winter Unlimited, Class Pass, Day Pass, Sparring Pass). |
| Embed | `/booking` embeds TeamUp's own schedule and membership pages in the page (loaded only when clicked, with a new-tab fallback in case a browser blocks third-party logins). |
| PT booking | TeamUp shows no public appointment types for TKO, so PT goes through the enquiry form. |
| Swappable | The interface only uses `src/lib/booking/types.ts`. Moving platforms means writing one new adapter. |

**Optional:** if TKO creates an API token in TeamUp, add it as `TEAMUP_API_TOKEN` in Vercel and it will be used automatically. Worth confirming with TeamUp that reading the public schedule this way is fine for production. It's the same data their public page shows.

### Forms (PT enquiry & contact)
Forms are validated on the client and the server, and include spam protection.
**They are not connected to an inbox yet.** Until they are, the visitor is told plainly that the message was *not sent* and is offered a pre-filled email to TKO instead. To make the forms send emails:
1. Create a free [Resend](https://resend.com) account and verify a sending domain.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your key
   - `ENQUIRY_TO_EMAIL` = where enquiries should go (defaults to tkoboxing020@gmail.com)
   - `ENQUIRY_FROM_EMAIL` = e.g. `TKO Website <hello@yourdomain.co.uk>`
3. Redeploy.

---

## 4. Needs the owner's confirmation before launch

While `demoMode` is on (`src/content/site.ts`), the site shows a dismissible demo notice and marks unconfirmed details with an amber **?** or a **Draft** tag.

1. **Photography.** Every photo is licensed Unsplash stock used as a placeholder. Replace them with TKO's own (see section 5). The coach cards show monograms until real portraits are supplied.
2. **Google rating** (5.0 from 12 reviews). Taken from directory listings; check the live Google profile.
3. **Draft FAQ answers:** what to wear and bring, gloves, how early to arrive, parking.
4. **Kids and Ladies Only classes.** These exist in TeamUp but aren't currently scheduled. Confirm whether to keep them as "register interest".
5. **Winter Unlimited offer (£40).** Confirm when it ends; remove it from `memberships.ts` afterwards.
6. **Coach bios.** Written only from their TeamUp profiles. Optional extras: portraits, coach Instagram handles, notable fighters coached, Kieran's pro record.
7. **Personal training prices.** Not public, so the site uses enquiries only. Add prices if wanted.
8. **Gym story.** The About page sticks to verified facts. A short founding story in Gary's words would strengthen it.
9. **WhatsApp.** If 07472 913333 is on WhatsApp, a WhatsApp button can be added.
10. **Testimonials.** None were written. Send 3–5 real member quotes (with permission) to add a testimonials section.

---

## 5. Editing & maintaining the site

All content lives in `src/content/`, so routine edits never touch page code.

| To change… | Edit |
| --- | --- |
| Phone, email, address, hours, Instagram, demo mode | `src/content/site.ts` |
| Prices, memberships, passes, offers | `src/content/memberships.ts` |
| Class descriptions, levels, images, which are on the timetable | `src/content/classes.ts` |
| Fallback weekly timetable / home page preview | `src/content/timetable.ts` |
| Coach bios, credentials, photos | `src/content/coaches.ts` |
| FAQs (set `verified: true` once approved) | `src/content/faqs.ts` |
| Photos | `src/content/media.ts` |

**Adding TKO's real photos:**
1. Put the images in `public/images/tko/` (JPGs at least 2000px wide for heroes).
2. In `src/content/media.ts`, change each entry's `src` (e.g. `"/images/tko/pads.jpg"`), `alt`, and remove `placeholder: true`.
3. For coach portraits, add `photo: { src: "/images/tko/gary.jpg", alt: "Gary Tarleton" }` to the coach in `coaches.ts`.
4. Images are graded black and white automatically for a consistent look. To show colour, pass `grade={false}` to `<Photo>`.

**The live timetable updates itself** from TeamUp every 15 minutes. Only edit `timetable.ts` if the regular weekly pattern changes. It's the fallback and drives the home page preview.

**Before launch:** set `demoMode: false` in `site.ts`, connect a custom domain in Vercel, set `NEXT_PUBLIC_SITE_URL` to it, and connect email (above).

### Local development
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

### Deploying to Vercel
1. Push to GitHub, then go to [vercel.com/new](https://vercel.com/new) and import the repo. The defaults work, with no build settings to change.
2. Optional environment variables: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, `TEAMUP_API_TOKEN`.
3. Or use the CLI: `npx vercel --prod`.

---

## 6. Recommended next steps

1. **Real photography and a 10–15s hero video** from Instagram. This is the biggest single upgrade.
2. **Connect enquiry email** (Resend, about 10 minutes).
3. **Google reviews feed.** Use the Google Places API to show the latest real reviews automatically.
4. **TeamUp appointments for PT**, so personal training can be booked and paid online like classes.
5. **Introductory offer**, e.g. "First class free" or a "3 classes for £X" starter pack in TeamUp, featured on `/start`.
6. **Kids' class timetable and parent info page** (safeguarding, age groups, what to bring).
7. **Google Business Profile.** Link the website, add photos, and post timetable updates.
8. **Analytics** (Vercel Analytics or Plausible) to track booking clicks from each page.
9. **WhatsApp chat button**, if the number is used for WhatsApp.
10. **Newsletter / member updates.** Only if TKO will actually send them.
