# Cucumber Studios — Website

A clean, production-ready static website for Cucumber Studios.

## Project Structure

```
cucumber-studios/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactions & animations
├── assets/
│   └── logo.png        # Company logo
├── .gitignore
└── README.md
```

## Sections

1. **Hero** — Headline, stats, floating UI cards
2. **Services** — Web & Mobile, Enterprise, AI/Data, Cloud & DevOps
3. **Process** — 5-step delivery methodology
4. **Impact** — Anonymised outcome metrics
5. **Clients** — Logo wall + 3 testimonials
6. **About** — Company story and values
7. **Contact** — Form (Formspree) + contact info

## Setup & Customisation

### 1. Replace placeholder content
- `index.html` — update email, phone number, and company details
- Replace dummy client names (Axiom, NovaCorp, etc.) with your real clients when ready
- Update testimonial quotes with real ones

### 2. Upload your real client logos
Replace the SVG placeholders in the `.clients__logos` section with `<img>` tags pointing to your actual client logo files. Place logo files in `/assets/`.

### 3. Set up the contact form (Formspree — free)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you'll get a form ID like `xpwzabcd`
3. In `index.html`, find this line:
   ```html
   <form ... action="https://formspree.io/f/mjgpgabv" ...>
   ```
   Replace `mjgpgabv` with your actual form ID.
4. Done — submissions will be emailed to you.

### 4. Connect your domain (Vercel — free)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), import the repo
3. In Vercel → Settings → Domains, add your custom domain
4. Update your domain's DNS to point to Vercel (they give you the exact records)
5. HTTPS is automatic and free.

## Local Development

No build step needed. Just open `index.html` in your browser, or use a simple local server:

```bash
# Python
python3 -m http.server 3000

# Node (if you have npx)
npx serve .
```

Then open `http://localhost:3000`

## Deployment Checklist

- [ ] Replace all `mjgpgabv` placeholders
- [ ] Update email address and phone number
- [ ] Add real client logos to `/assets/`
- [ ] Replace dummy testimonials with real ones
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add custom domain in Vercel

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS — no frameworks, no dependencies
- Google Fonts (Syne + DM Sans) — loaded via CDN
- Formspree for contact form submissions
- Deployed on Vercel (free)
