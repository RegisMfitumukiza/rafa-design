# Vercel Setup - Step-by-Step Instructions

Follow these exact steps to deploy your site to production.

---

## Step 1: Push Code to GitHub

Make sure your code is pushed to GitHub:

```powershell
cd e:\rafa-design-website
git status
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

---

## Step 2: Create Vercel Project

1. Go to **https://vercel.com**
2. Sign in with GitHub (or create account if needed)
3. Click **"Add New..."** button → Select **"Project"**
4. You should see `rafa-design-website` in the list
5. Click to select it
6. Vercel will auto-detect:
   - Framework: **Next.js**
   - Build command: **npm run build**
   - Output directory: **.next**
   - Install command: **npm install**

**Click "Deploy"** - Do NOT click deploy yet, we need to add environment variables first.

---

## Step 3: Add Environment Variables in Vercel

Before clicking Deploy, you'll see an "Environment Variables" section.

Add these variables from your `.env.local`:

| Variable                         | Value                                                                                                                                                                                  | Environment |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `NEXT_PUBLIC_SITE_URL`           | `http://localhost:8000`                                                                                                                                                                | Development |
| `NEXT_PUBLIC_SITE_URL`           | `https://yourdomain.com`                                                                                                                                                               | Production  |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | `9rbnou67`                                                                                                                                                                             | All         |
| `NEXT_PUBLIC_SANITY_DATASET`     | `production`                                                                                                                                                                           | All         |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-08-20`                                                                                                                                                                           | All         |
| `SANITY_API_TOKEN`               | `skVoTAPCFjdmdzUUtOFovXzgutcuHaUbRSiALi68SdNp5bCeaHFe2sddE8SC9EPwQUufLuYPR6YK0SiErHaICczm5xc2uM5QBCxHnMU6Spw8x0VR5lv0DHt9eSzrfKTyepii34ZERxa5OgVumMrANDhDkLyUeetFGbLIFyCAjuqPJb8hp3lF` | All         |
| `CRON_SECRET`                    | `a49973e2d52c4a022698f200f4e51d9e17478bcd6921394912af0eda8989c0ba`                                                                                                                     | Production  |
| `RESEND_API_KEY`                 | `re_gjh5FDdZ_PnkCUhS4hXMHhjZd3eAxUEy7`                                                                                                                                                 | All         |
| `RESEND_FROM_EMAIL`              | `RAFA Design Hub <onboarding@resend.dev>`                                                                                                                                              | All         |

**For each variable:**

1. Enter the name
2. Enter the value
3. Select which environment(s) it applies to
4. Click "Add"

---

## Step 4: Deploy to Vercel

After adding all variables, click **"Deploy"**

Vercel will:

1. Build your Next.js app
2. Run tests
3. Deploy to their CDN
4. Give you a `.vercel.app` domain

**Wait for it to complete** - you'll see a success message.

---

## Step 5: Get Your Vercel Domain

After deployment succeeds, you'll see:

```
https://rafa-design-website.vercel.app
```

**Open this URL and test:**

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Images load
- [ ] No console errors (F12 → Console)

If there are errors, check:

1. Vercel Deployments tab for build errors
2. Vercel Function logs for runtime errors
3. Network tab in DevTools for failed requests

---

## Step 6: Get Vercel's DNS Configuration

Now that your app is deployed, Vercel will give you DNS records.

In Vercel project:

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `rafadesign.com`)
4. Vercel will show DNS options:

**You'll see ONE of these:**

### Option A: Nameserver (Recommended)

- Vercel shows: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, etc.
- You use these in Step 8

### Option B: CNAME

- Vercel shows: `cname.vercel-dns.com`
- You use this in Step 8

**Copy these values - you'll need them in Cloudflare**

---

## Step 7: Update Your Domain Registrar

Go to **where you BOUGHT the domain** (not Cloudflare):

1. Find domain settings → Nameservers
2. Replace existing nameservers with **Cloudflare's nameservers**:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
   - `ns3.cloudflare.com`
   - `ns4.cloudflare.com`
3. Save
4. **Wait 24-48 hours** for DNS to propagate

**This step tells your registrar that Cloudflare is managing your DNS.**

---

## Step 8: Add Vercel to Cloudflare DNS

Once nameservers are updated to Cloudflare:

1. Go to **Cloudflare Dashboard** → Your Domain
2. Click **DNS** in the sidebar
3. Click **"Add Record"**

### If using CNAME method:

- **Type:** CNAME
- **Name:** @ (or your domain name)
- **Target:** cname.vercel-dns.com
- **TTL:** Auto
- **Proxy Status:** DNS only (⚠️ Important)
- Click **Save**

### If using Nameserver method:

- You already did this in Step 7 (at your registrar)
- Just verify in Cloudflare that DNS is working

---

## Step 9: Verify DNS Resolution

Once DNS propagates (can take up to 48 hours):

```powershell
# Check if your domain resolves to Vercel
nslookup yourdomain.com

# Should return Vercel's IP addresses
```

You can also use: https://whatsmydns.net (enter your domain)

---

## Step 10: Enable Custom Domain in Vercel

Back in Vercel:

1. **Settings** → **Domains**
2. You should see your domain listed
3. Click on it and check status
4. Should show: **Valid Configuration** ✓

Vercel will automatically provision an SSL certificate (takes a few minutes).

---

## Step 11: Test Production Domain

Once DNS propagates and SSL is provisioned:

1. Visit **https://yourdomain.com**
2. Check browser has **green padlock** (HTTPS working)
3. Verify site loads correctly
4. Check no console errors (F12)
5. Run Lighthouse audit

---

## Step 12: Set Production Environment Variables (Updated SITE_URL)

Now that you have your real domain, update it in Vercel:

1. Vercel **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_SITE_URL`
3. Edit the **Production** value to your actual domain
4. Example: `https://rafadesign.com`
5. Save (triggers a redeploy automatically)

---

## Troubleshooting

### "Domain Already Taken"

- Domain is registered elsewhere
- Go to your registrar, update nameservers to Cloudflare
- Wait 24-48 hours
- Try again in Vercel

### "DNS Not Resolving"

- Check your registrar's nameserver settings
- Verify you used Cloudflare's nameservers (not Vercel's)
- Use https://whatsmydns.net to check propagation
- Wait up to 48 hours

### "SSL Certificate Not Provisioning"

- DNS must resolve first
- Can take 10-30 minutes after DNS propagation
- Check Vercel dashboard for certificate status
- Try removing and re-adding domain

### "Build Failing"

- Check Vercel Deployments tab
- Click failed deployment to see logs
- Common issues:
  - Missing environment variables
  - Sanity project ID incorrect
  - API token expired
  - Node modules not installing

---

## Summary of Key Points

1. ✅ Code is on GitHub
2. ✅ Vercel project created
3. ✅ Environment variables added
4. ✅ Deployed to Vercel
5. ✅ Temporary domain works
6. ✅ Registrar nameservers → Cloudflare
7. ✅ Cloudflare DNS records → Vercel
8. ✅ Custom domain in Vercel
9. ✅ SSL certificate provisioned
10. ✅ Production domain live

Once complete, your site is live and automatically scales.

---

## Next Steps After Deployment

1. Monitor for errors (Vercel Dashboard)
2. Set up analytics (Google Analytics, PostHog)
3. Configure Resend for contact form emails
4. Add SPF/DKIM records in Cloudflare for email deliverability
5. Set up uptime monitoring
6. Configure backup strategy

Your site is now on production! 🚀
