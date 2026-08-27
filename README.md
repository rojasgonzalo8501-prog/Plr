# ExhalePLR — PLR/MRR 2.0 (Clean Master)

Static frontend baseline for the approved ExhalePLR 2.0 direction: warm cream, beige, light-brown and restrained gold accents. The public landing page is intentionally separate from the Member Vault, internal tools and legacy material.

## Start here

Open `index.html` to view the public landing page. For a local server, run `python3 -m http.server` from this folder and open the displayed local address.

## Project map

```text
/
├── index.html                 public landing page only
├── assets/                    CSS, UI behaviour and supplied product imagery
├── app/                       Member Vault prototype (separate customer routes)
│   ├── dashboard/
│   ├── vault/
│   ├── downloads/
│   └── collections/
├── legal/                     launch-draft legal, company and support pages
├── internal/                  isolated prototype entry points; not public navigation
│   ├── admin/
│   └── employment/
└── legacy/                    isolated legacy placeholder; not public navigation
```

## Current scope

This is the verified Phase 2B frontend prototype. Product search, category filtering, favourites and collections use browser storage for demonstration. Authentication, payment processing, role checks, product-file authorization and secure downloads require the planned Supabase, Stripe and storage integrations before production.

## Design guardrail

Do not replace the approved visual direction with a dark SaaS theme. Preserve the soft cream/white/light-brown palette, premium editorial spacing, rounded cards and product-led visual storytelling.

## Before launch

Replace the bracketed company/contact fields in `legal/` with verified business information; then add Supabase Auth + RLS/RBAC, Stripe webhooks, authorized signed downloads, cookie-consent tooling, SEO metadata/sitemap and full mobile/security QA.
