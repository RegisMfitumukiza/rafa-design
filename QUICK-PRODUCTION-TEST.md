# Quick Production Test Guide

5-minute checklist to verify your site is live and working.

---

## ✅ Test #1: Site is Live (30 seconds)

**Open your browser and visit:**

```
https://rafadesignhub.com
```

**Expected result:**

- ✅ Page loads
- ✅ Green padlock (🔒) in address bar
- ✅ No security warnings
- ✅ Your content displays

**If it fails:**

- Wait 5 more minutes (DNS propagation)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito mode (Ctrl+Shift+N)

---

## ✅ Test #2: Contact Form Works (2 minutes)

**Steps:**

1. Go to `https://rafadesignhub.com/contact`
2. Fill out the form:
   ```
   Name: Test User
   Email: your-personal-email@example.com
   Subject: Production Test
   Message: Testing contact form on production site
   ```
3. Click **Submit**
4. Wait for success message
5. Check your email inbox: `rafadesignhub@gmail.com`

**Expected result:**

- ✅ Form submits successfully
- ✅ Email arrives within 1 minute
- ✅ From: `noreply@rafadesignhub.com`
- ✅ Contains form details
- ✅ Reply-To is the visitor's email

**If email doesn't arrive:**

- Check spam folder
- Check Resend dashboard for delivery logs
- Wait 5 minutes and try again

---

## ✅ Test #3: No Console Errors (1 minute)

**Steps:**

1. On `https://rafadesignhub.com`
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. Refresh page (F5)
5. Look for red error messages

**Expected result:**

- ✅ No red errors
- ✅ No 404 errors (failed requests)
- ✅ No CORS errors
- ⚠️ Warnings are OK (yellow text)

---

## ✅ Test #4: Mobile View (1 minute)

**Steps:**

1. With DevTools open (F12)
2. Click device toggle icon (or Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Check:
   - ✅ Layout adjusts to mobile size
   - ✅ Text is readable
   - ✅ Images scale properly
   - ✅ Navigation menu works

---

## ✅ Test #5: Performance Check (30 seconds)

**Option A: Quick Browser Check**

- Page should load in under 3 seconds
- Images should appear quickly
- No long loading spinners

**Option B: PageSpeed Insights**

1. Go to: https://pagespeed.web.dev
2. Enter: `https://rafadesignhub.com`
3. Click "Analyze"
4. Wait for results
5. Target: All scores 70+ (green)

---

## 🎉 If All Tests Pass

**Congratulations!** Your site is live and production-ready at:

```
https://rafadesignhub.com
```

---

## 🚨 Common Issues & Fixes

### Issue: Site doesn't load

**Cause:** DNS not propagated yet
**Fix:** Wait 1-24 hours, check https://whatsmydns.net

### Issue: SSL warning

**Cause:** Certificate still provisioning
**Fix:** Wait 30 minutes, Vercel auto-provisions SSL

### Issue: Contact form doesn't send

**Cause:** Environment variable not set or DNS not verified
**Fix:**

1. Check Vercel env vars
2. Verify Resend domain status
3. Check Resend delivery logs

### Issue: Images not loading

**Cause:** Sanity CDN or incorrect URLs
**Fix:**

1. Check Sanity project ID in Vercel
2. Verify images are published in Sanity

### Issue: 404 on some pages

**Cause:** Routing or build error
**Fix:**

1. Check Vercel deployment logs
2. Verify Next.js build succeeded
3. Check file structure

---

## 📞 Getting Help

**Vercel Issues:**

- Dashboard: https://vercel.com/dashboard
- Logs: Vercel → Your Project → Deployments → View Function Logs

**Email Issues:**

- Resend Dashboard: https://resend.com/emails
- Check delivery status and logs

**DNS Issues:**

- Check propagation: https://whatsmydns.net
- Cloudflare DNS: https://dash.cloudflare.com

---

## ✅ Production Checklist Complete

- [x] Domain live with HTTPS
- [x] Contact form configured
- [x] Console clean
- [x] Mobile responsive
- [x] Performance acceptable

**Your site is ready for the world! 🚀**
