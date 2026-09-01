# Production Deployment Guide — RAFA Design

This guide walks you through deploying the RAFA Design website to production with Cloudflare DNS and Vercel hosting.

---

## Overview

- **Hosting:** Vercel (Next.js native platform)
- **DNS:** Cloudflare (domain management)
- **Domain:** Your custom Cloudflare domain
- **CMS:** Sanity (content management)
- **Email:** Resend (contact form delivery)

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account with the repository pushed
- [ ] Vercel account (free tier available)
- [ ] Cloudflare account with domain transferred
- [ ] Sanity project set up (project ID + API credentials)
- [ ] Resend account (for contact form emails)
- [ ] Environment variables prepared (see below)

---

## Phase 1: Prepare Environment Variables

Collect these values before deploying:

### Site Configuration

```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com  # Your actual domain
```

### Sanity CMS

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id        # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET = production                 # Always use 'production'
NEXT_PUBLIC_SANITY_API_VERSION = 2024-08-20            # Current version
SANITY_API_READ_TOKEN = your_api_token                 # From sanity.io/manage → API → Tokens
```

### Email (Resend)

```
RESEND_API_KEY = your_api_key                          # From resend.com dashboard
RESEND_FROM_EMAIL = inquiry@yourdomain.com             # Must be verified in Resend
```

### Security

```
CRON_SECRET = generate_random_secure_string            # Use: openssl rand -hex 32
```

### Analytics (Optional)

```
NEXT_PUBLIC_GA_ID = your_ga_id                         # Google Analytics ID
NEXT_PUBLIC_POSTHOG_KEY = your_posthog_key             # PostHog analytics key
NEXT_PUBLIC_MAPBOX_TOKEN = your_mapbox_token           # Mapbox API key
```

---

## Phase 2: Deploy to Vercel

### Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select the `rafa-design-website` repository
5. Vercel will auto-detect Next.js configuration

### Step 2: Configure Environment Variables in Vercel

1. In Vercel dashboard, open your project
2. Go to **Settings** → **Environment Variables**
3. Add each variable from Phase 1:
   - Add to all environments (Production, Preview, Development) OR
   - Add only to Production for sensitive keys
4. Save

### Step 3: Deploy

1. Vercel will automatically deploy on save
2. You'll get a temporary URL: `https://rafa-design-website.vercel.app`
3. Verify the deployment works before connecting your domain

### Step 4: Verify Deployment

- [ ] Visit temporary Vercel URL and test basic functionality
- [ ] Check that navigation works
- [ ] Verify Sanity content loads correctly
- [ ] Test contact form (if enabled)
- [ ] Check console for errors (F12 → Console tab)

---

## Phase 3: Point Cloudflare DNS to Vercel

### Step 1: Get Cloudflare Nameservers

1. Go to your Cloudflare dashboard
2. Select your domain
3. Go to **Nameservers** in the sidebar
4. Copy your Cloudflare nameservers:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
   - (and any others shown)

### Step 2: Update Domain Registrar

1. Go to where you **bought the domain** (not Cloudflare)
2. Find domain settings → Nameservers
3. Replace the current nameservers with Cloudflare's nameservers
4. Save and wait 24-48 hours for propagation

**Note:** Cloudflare is managing your DNS, but your registrar still needs to point to Cloudflare's nameservers.

---

## Phase 4: Connect Custom Domain to Vercel

### Step 1: Add Domain in Vercel

1. Vercel Project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `rafadesign.com`)
4. Vercel will show DNS configuration options

### Step 2: Choose DNS Configuration

Vercel will give you options:

**Option A: Nameserver (Recommended)**

- Vercel manages DNS through Cloudflare
- Shows you Vercel's nameservers
- You've already updated these in Phase 3

**Option B: CNAME**

- You manually add DNS records in Cloudflare
- If Nameserver approach doesn't work, use this

### Step 3: For CNAME Method (If Needed)

1. Vercel shows: `cname.vercel-dns.com`
2. Go to Cloudflare → DNS Records
3. Add new record:
   - **Type:** CNAME
   - **Name:** @ (or your domain)
   - **Target:** cname.vercel-dns.com
   - **TTL:** Auto
   - **Proxy Status:** DNS only
4. Save

### Step 4: Add WWW Subdomain

Optional but recommended:

1. In Cloudflare DNS, add another CNAME:
   - **Type:** CNAME
   - **Name:** www
   - **Target:** cname.vercel-dns.com
2. In Vercel, add `www.yourdomain.com` as an alias

---

## Phase 5: Enable HTTPS

Once DNS is configured:

1. Wait for DNS propagation (up to 48 hours)
2. Vercel will automatically provision SSL certificate
3. Project → **Settings** → **Domains** will show **"Valid Configuration"** (green checkmark)
4. HTTPS will be automatic

---

## Phase 6: Verify Production

### Check DNS Resolution

```powershell
# Verify your domain points to Vercel
nslookup yourdomain.com
```

Should return Vercel's IP addresses.

### Test Production URL

- [ ] Visit `https://yourdomain.com`
- [ ] Verify all pages load
- [ ] Test animations and interactions
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test contact form (if available)
- [ ] Check console for errors

### Performance Check

1. Run Lighthouse:
   - Open DevTools (F12)
   - Lighthouse tab
   - Run audit
   - Target: All scores 90+

2. Check Core Web Vitals:
   - Use PageSpeed Insights
   - Input your domain
   - Verify green scores

### Security Headers

Vercel automatically enforces the security headers configured in `next.config.ts`:

- HSTS (Strict-Transport-Security)
- X-Frame-Options
- X-Content-Type-Options
- CSP (Content Security Policy)

---

## Phase 7: Post-Deployment Setup

### Email Verification (if using contact form)

1. Go to Resend dashboard
2. Verify your sender domain (`inquiry@yourdomain.com`)
3. Resend will provide DNS records to add to Cloudflare
4. Add SPF and DKIM records in Cloudflare DNS for email deliverability

### Analytics Setup (Optional)

If you want to track traffic:

1. Google Analytics:
   - Go to analytics.google.com
   - Create property for your domain
   - Get Measurement ID (GA-XXXX)
   - Add to `NEXT_PUBLIC_GA_ID`

2. PostHog:
   - Create project at posthog.com
   - Get API key
   - Add to `NEXT_PUBLIC_POSTHOG_KEY`

### Monitoring

Set up error monitoring (optional but recommended):

1. Go to sentry.io
2. Create project
3. Get DSN
4. Integrate into application

---

## Phase 8: Post-Launch Checklist

- [ ] Domain is accessible at production URL
- [ ] SSL certificate is valid (check browser padlock)
- [ ] All pages load correctly
- [ ] Contact form sends emails successfully
- [ ] Images optimize and load quickly
- [ ] Animations perform smoothly
- [ ] Mobile layout is responsive
- [ ] Accessibility features work (keyboard nav, screen readers)
- [ ] Performance scores are 90+
- [ ] No console errors in DevTools
- [ ] Lighthouse audit passes
- [ ] Security headers are present
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Analytics tracking is working
- [ ] Backup strategy is in place

---

## Troubleshooting

### Domain Not Resolving

1. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Verify nameservers are pointing to Cloudflare
3. In Cloudflare, verify DNS records are correct
4. Wait up to 48 hours for full propagation

### HTTPS Not Enabling

1. Ensure DNS is fully propagated
2. Vercel requires domain to resolve before provisioning SSL
3. Check Vercel → Settings → Domains for status
4. Try re-adding domain if needed

### Contact Form Not Sending

1. Verify `RESEND_API_KEY` is set in Vercel
2. Verify `RESEND_FROM_EMAIL` is verified in Resend dashboard
3. Check Resend dashboard for bounce or delivery issues
4. Test locally with `.env.local` before production

### Images Not Loading

1. Verify Sanity CDN is accessible
2. Check image URLs in Sanity editor
3. Ensure images are published (not draft)
4. Check browser DevTools Network tab for 403/404 errors

### Slow Performance

1. Run Lighthouse audit
2. Check Core Web Vitals
3. Verify images are optimized (WebP/AVIF)
4. Check Sanity API performance
5. Enable Vercel Analytics for insights

---

## Rollback Strategy

If production issues occur:

1. Immediately revert to previous stable commit
2. Push to GitHub
3. Vercel will auto-redeploy to previous version
4. Investigate locally
5. Fix and test thoroughly before redeploying

---

## Support

For issues:

- **Vercel Issues:** [vercel.com/support](https://vercel.com/support)
- **Cloudflare DNS:** [cloudflare.com/support](https://cloudflare.com/support)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity:** [sanity.io/help](https://sanity.io/help)
- **Resend:** [resend.com/docs](https://resend.com/docs)

---

## Next Steps

1. Gather all environment variables from Phase 1
2. Create Vercel project and add environment variables
3. Deploy to Vercel
4. Point Cloudflare nameservers in your registrar
5. Connect domain to Vercel
6. Verify production is live
7. Monitor for issues

Your website will be live once DNS propagates (24-48 hours).
