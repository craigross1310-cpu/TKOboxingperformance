# TKO Boxing & Performance Centre — Website

Premium multi-page website for TKO Boxing & Performance Centre, Glasgow.

**Live demo:** https://tko-boxing-performance-centre.vercel.app

- **Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Lucide, Zod
- **Booking:** live class schedule from TKO's TeamUp account (cached 15 min, with a verified fallback); bookings and payments happen on TeamUp
- **Content:** every editable fact lives in `src/content/`

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
src/
  app/                 # pages: /, classes, timetable, coaches, about, faq, booking, start, membership, contact
    api/enquiry/       # PT + contact form endpoint (Resend email when RESEND_API_KEY is set)
  components/          # ui primitives, layout, sections, timetable, coaches, faq, forms
  content/             # site info, classes, timetable, coaches, memberships, faqs, media  ← edit here
  lib/booking/         # provider-agnostic schedule types + TeamUp adapter
```

## Environment variables (all optional)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap (defaults to the Vercel production URL) |
| `RESEND_API_KEY` | Enables email delivery of enquiries |
| `ENQUIRY_TO_EMAIL` / `ENQUIRY_FROM_EMAIL` | Enquiry recipient / sender |
| `TEAMUP_API_TOKEN` | Optional TeamUp API token |

See **[HANDOVER.md](./HANDOVER.md)** for research, the owner-confirmation checklist, booking integration details and maintenance instructions.
