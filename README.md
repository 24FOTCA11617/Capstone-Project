# Northstar Market

A responsive e-commerce product catalog built with React, Vite, and React Router. The experience focuses on considered goods, editorial browsing, and a fast path from discovery to bag.

## Included

- Modular route views for home, shop, category collections, journal, and story pages
- Client-side routing with React Router
- Filterable and sortable product catalog
- Save-for-later states and an interactive cart drawer
- Responsive mobile navigation and layouts
- Remote image assets served through Unsplash's optimized image endpoint
- Production build script through Vite

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Deploy

Import this repository into Vercel, Netlify, or Render as a Vite project. Use `npm run build` as the build command and `dist` as the output directory. No environment variables are required.

For Vercel CLI:

```bash
npm install
npx vercel
```

## Optional integrations

The account form uses local demo auth by default. To enable real Supabase email/password authentication:

1. Create a Supabase project and enable Email Auth.
2. Copy `.env.example` to `.env.local`.
3. Add your project URL and anon key to `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Add the same two variables in Vercel under **Settings > Environment Variables**.
5. Redeploy the project.

The checkout currently supports a safe demo flow for UPI, card, and COD. Real Razorpay payments must be implemented through a server-side order endpoint and webhook signature verification. Never expose `RAZORPAY_KEY_SECRET` in a `VITE_` variable or client-side code.

## Backend API routes

Vercel deploys the `api/` directory as serverless functions:

```text
GET  /api/products?q=light&category=Electronics
POST /api/orders
POST /api/payment
GET  /api/tracking?orderId=NS-123456
POST /api/support
```

These routes provide validated demo responses. Before production use, connect orders and tickets to Supabase with row-level security, create Razorpay orders on the server, verify payment webhooks, and connect tracking to a courier provider such as Shiprocket or Delhivery.
