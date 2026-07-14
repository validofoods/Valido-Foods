# Valido Foods — Website

Premium spices, seasonings, and herb blends crafted in Dallas, TX.

## Stack
- Static HTML/CSS/JS
- Vercel (hosting + serverless functions)
- Stripe (payments)

## Setup
1. Clone this repo
2. Connect to Vercel
3. Add environment variable: `STRIPE_SECRET_KEY`
4. Deploy

## Structure
```
├── index.html          # Homepage
├── shop.html           # Shop with cart + Stripe checkout
├── api/
│   └── create-checkout-session.js   # Stripe serverless function
├── images/             # Product images (41 files)
├── robots.txt          # SEO
├── sitemap.xml         # SEO
└── package.json        # Stripe dependency
```
