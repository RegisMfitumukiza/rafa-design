# Production Deployment Checklist

Quick reference guide for deploying RAFA Design to production.

---

## ✅ Pre-Deployment

- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] `.env.local` has all credentials (DO NOT commit this file)
- [ ] Domain purchased and active on Cloudflare

---

## 🚀 Vercel Setup (30 minutes)

### 1. Create Project

- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Select `rafa-design-website` repo

### 2. Add Environment Variables

Copy from your `.env.local`:

**Production-specific:**

```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
CRON_SECRET = a49973e2d52c4a022698f200f4e51d9e17478bcd6921394912af0eda8989c0ba
```

**All environments:**

```
NEXT_PUBLIC_SANITY_PROJECT_ID = 9rbnou67
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-08-20
SANITY_API_TOKEN = skVoTAPCFjdmdzUUtOFovXzgutcuHaUbRSiALi68SdNp5bCeaHFe2sddE8SC9EPwQUufLuYPR6YK0SiErHaICczm5xc2uM5QBCxHnMU6Spw8x0VR5lv0DHt9eSzrfKTyepii34ZERxa5OgVumMrANDhDkLyUeetFGbLIFyCAjuqPJb8hp3lF
RESEND_API_KEY = re_gjh5FDdZ_PnkCUhS4hXMHhjZd3eAxUEy7
RESEND_FROM_EMAIL = RAFA Design Hub <onboarding@resend.dev>
```

- [ ] All variables added
- [ ] Correct environment selected (Production vs All)

### 3. Deploy

- [ ] Click "Deploy"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Visit `.vercel.app` domain to verify

---

## 🌐 DNS Configuration (24-48 hours)

### Option A: Domain Bought on Cloudflare (Easier)

- [ ] Go to Cloudflare dashboard
- [ ] DNS → Add Record
- [ ] Type: CNAME, Name: @, Target: `cname.vercel-dns.com`
- [ ] Proxy Status: **DNS only** ⚠️
- [ ] Save

### Option B: Domain From Other Registrar

- [ ] Go to your registrar (GoDaddy, Namecheap, etc.)
- [ ] Find nameserver settings
- [ ] Replace with Cloudflare nameservers:
  - `ns1.cloudflare.com`
  - `ns2.cloudflare.com`
  - `ns3.cloudflare.com`
  - `ns4.cloudflare.com`
- [ ] Save and wait 24-48 hours

Then follow Option A above.

---

## 🔗 Connect Domain to Vercel

- [ ] Vercel Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter your domain (e.g., `rafadesign.com`)
- [ ] Follow Vercel's instructions
- [ ] Wait for DNS propagation
- [ ] Verify "Valid Configuration" ✓

---

## 🔒 SSL Certificate (Automatic)

- [ ] Wait 10-30 minutes after DNS propagates
- [ ] Vercel auto-provisions SSL
- [ ] Check green padlock in browser
- [ ] Force HTTPS in Cloudflare:
  - SSL/TLS → Always Use HTTPS: ON

---

## 📧 Email Setup (Optional, for Contact Form)

### Verify Sender Domain in Resend

- [ ] Go to https://resend.com dashboard
- [ ] Add your domain
- [ ] Get DNS records (SPF, DKIM)

### Add to Cloudflare DNS

**SPF Record:**

- [ ] Type: TXT
- [ ] Name: @
- [ ] Content: `v=spf1 include:resend.com ~all`

**DKIM Record (from Resend):**

- [ ] Type: CNAME
- [ ] Name: (provided by Resend)
- [ ] Target: (provided by Resend)

- [ ] Save and verify in Resend dashboard

---

## 🧪 Production Verification

### Site Accessibility

- [ ] Visit `https://yourdomain.com`
- [ ] HTTPS working (green padlock)
- [ ] All pages load
- [ ] Navigation works
- [ ] Images load
- [ ] No console errors (F12)

### Performance

- [ ] Run Lighthouse audit (F12 → Lighthouse)
- [ ] Target scores: 90+ on all metrics
- [ ] Check Core Web Vitals: https://pagespeed.web.dev

### Functionality

- [ ] Test contact form (if enabled)
- [ ] Verify Sanity content loads
- [ ] Test all interactive elements
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)

---

## 📊 Post-Launch Setup (Optional)

### Analytics

- [ ] Google Analytics (add `NEXT_PUBLIC_GA_ID`)
- [ ] PostHog (add `NEXT_PUBLIC_POSTHOG_KEY`)
- [ ] Vercel Analytics (enable in dashboard)

### Monitoring

- [ ] Sentry for error tracking
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Performance monitoring

### Security

- [ ] Review Cloudflare security settings
- [ ] Enable rate limiting (if needed)
- [ ] Set up DDoS protection

---

## 🔧 Common Issues & Fixes

### Build Failing on Vercel

**Fix:** Check environment variables, verify Sanity credentials

### Domain Not Resolving

**Fix:**

```powershell
nslookup yourdomain.com
```

Check DNS propagation: https://whatsmydns.net
Wait up to 48 hours

### SSL Not Working

**Fix:** Wait for DNS to propagate first, then SSL provisions automatically

### Contact Form Not Sending

**Fix:** Verify Resend API key, check sender email is verified

### Images Not Loading

**Fix:** Check Sanity CDN URLs, verify `NEXT_PUBLIC_SANITY_PROJECT_ID`

---

## 🎯 Success Criteria

Your deployment is complete when:

- ✅ Custom domain is accessible
- ✅ HTTPS is working (green padlock)
- ✅ All pages load correctly
- ✅ No console errors
- ✅ Performance scores 90+
- ✅ Mobile responsive
- ✅ Contact form working (if enabled)
- ✅ Sanity content displays
- ✅ Analytics tracking (if enabled)

---

## 📞 Support Resources

- **Vercel:** https://vercel.com/support
- **Cloudflare:** https://dash.cloudflare.com → Support
- **Sanity:** https://sanity.io/help
- **Resend:** https://resend.com/docs

---

## 🚨 Emergency Rollback

If something breaks in production:

1. Go to Vercel → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Instant rollback to stable version
5. Fix issue locally
6. Redeploy when ready

---

## 📝 Notes

**Timeline:**

- Vercel deployment: 5-10 minutes
- DNS propagation: 1-48 hours
- SSL provisioning: 10-30 minutes after DNS
- Total: 1-48 hours (depending on DNS)

**Remember:**

- Never commit `.env.local` to GitHub
- Test on `.vercel.app` domain before DNS
- DNS changes take time - be patient
- Vercel auto-redeploys on every `git push`

---

## ✨ You're Live!

Once checklist is complete, your site is on production.

Share your URL and celebrate! 🎉
