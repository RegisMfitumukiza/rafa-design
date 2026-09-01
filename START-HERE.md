# 🚀 START HERE - Production Deployment

**Your RAFA Design website is ready to go live!**

---

## 📋 What You Have

✅ **Next.js website** - fully built and tested locally  
✅ **Sanity CMS** - configured with project ID: `9rbnou67`  
✅ **Environment variables** - properly separated (see `ENVIRONMENT-VARIABLES-GUIDE.md`)  
✅ **Cloudflare domain** - purchased and ready to configure  
✅ **Resend email** - API key ready for contact form

---

## 🎯 What You Need To Do

Follow these 3 documents in order:

### 1️⃣ Quick Reference (5 min read)

**File:** `DEPLOYMENT-CHECKLIST.md`

- Checklist format
- All steps at a glance
- Perfect for tracking progress

### 2️⃣ Detailed Vercel Setup (15-30 min)

**File:** `VERCEL-SETUP-STEPS.md`

- Step-by-step Vercel configuration
- Environment variable setup
- Domain connection instructions

### 3️⃣ Complete Guide (reference)

**File:** `PRODUCTION-DEPLOYMENT-GUIDE.md`

- Comprehensive documentation
- Troubleshooting section
- Post-deployment checklist

---

## ⚡ Quick Start (30 seconds)

### Step 1: Push to GitHub

```powershell
cd e:\rafa-design-website
git status
git add .
git commit -m "chore: prepare for production"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Import `rafa-design-website` repository
4. Add environment variables (see below)
5. Click Deploy

### Step 3: Copy Environment Variables to Vercel

**Copy these from your `.env.local`:**

```env
# Production URL (change after domain is connected)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-08-20
SANITY_API_TOKEN=skVoTAPCFjdmdzUUtOFovXzgutcuHaUbRSiALi68SdNp5bCeaHFe2sddE8SC9EPwQUufLuYPR6YK0SiErHaICczm5xc2uM5QBCxHnMU6Spw8x0VR5lv0DHt9eSzrfKTyepii34ZERxa5OgVumMrANDhDkLyUeetFGbLIFyCAjuqPJb8hp3lF

# Email (Resend)
RESEND_API_KEY=re_gjh5FDdZ_PnkCUhS4hXMHhjZd3eAxUEy7
RESEND_FROM_EMAIL=RAFA Design Hub <onboarding@resend.dev>

# Security
CRON_SECRET=a49973e2d52c4a022698f200f4e51d9e17478bcd6921394912af0eda8989c0ba
```

**⚠️ Important:** Select "Production" or "All Environments" for each variable.

---

## 🌐 DNS Configuration (After Vercel Deploy)

### Once Vercel gives you DNS records:

**In Cloudflare Dashboard:**

1. Go to your domain → DNS
2. Add Record:
   - **Type:** CNAME
   - **Name:** @ (root domain)
   - **Target:** `cname.vercel-dns.com`
   - **Proxy Status:** DNS only ⚠️
3. Save

**In Vercel Dashboard:**

1. Settings → Domains
2. Add your domain
3. Wait for DNS propagation (24-48 hours)
4. SSL automatically provisions

---

## ⏱️ Timeline

| Step                  | Duration       |
| --------------------- | -------------- |
| Push to GitHub        | 2 minutes      |
| Vercel setup & deploy | 10-15 minutes  |
| DNS propagation       | 1-48 hours     |
| SSL provisioning      | 10-30 minutes  |
| **Total**             | **1-48 hours** |

---

## ✅ Success Checklist

Your site is live when:

- [ ] `https://yourdomain.com` loads
- [ ] Green padlock (HTTPS working)
- [ ] All pages accessible
- [ ] Images loading from Sanity
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] Mobile responsive

---

## 🆘 Need Help?

**Common Issues:**

1. **Build failing?** → Check environment variables in Vercel
2. **Domain not resolving?** → Check DNS at https://whatsmydns.net
3. **SSL not working?** → Wait for DNS propagation first
4. **Images not loading?** → Verify Sanity project ID

**Detailed troubleshooting in:** `PRODUCTION-DEPLOYMENT-GUIDE.md`

---

## 📞 Support

- **Vercel:** https://vercel.com/support
- **Cloudflare:** https://dash.cloudflare.com → Support
- **Documentation:** See the 3 guides above

---

## 🎉 Ready to Launch?

1. ✅ Read `DEPLOYMENT-CHECKLIST.md`
2. ✅ Follow `VERCEL-SETUP-STEPS.md`
3. ✅ Reference `PRODUCTION-DEPLOYMENT-GUIDE.md` if needed

**Let's go live! 🚀**

---

## 📝 Notes

- Your `.env.local` contains all credentials (never commit this file)
- Vercel auto-redeploys on every `git push` to main
- DNS changes take time - be patient
- Test everything on `.vercel.app` domain first

---

**Next:** Open `DEPLOYMENT-CHECKLIST.md` and start checking off tasks!
